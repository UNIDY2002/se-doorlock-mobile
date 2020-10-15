import {Button, FlatList, Image, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {ModifyUserRouteProp, UsersNav} from "./usersStack";
import {
    addDoorUserPhotos,
    createDoorUser,
    getDoorUser,
    getDoorUserPhotos,
    updateDoorUser,
} from "../../network/users";
import Snackbar from "react-native-snackbar";
import {Camera} from "../../components/camera";

interface AuthConfig {
    uri: string;
    headers: {Authorization: string};
}

export const ModifyUserScreen = ({
    navigation,
    route,
}: {
    navigation: UsersNav;
    route: ModifyUserRouteProp;
}) => {
    const [name, setName] = useState(route.params?.name ?? "");
    const [description, setDescription] = useState(
        route.params?.description ?? "",
    );
    const [cameraOn, setCameraOn] = useState(false);
    const [photos, setPhotos] = useState<AuthConfig[]>([]);
    const [photoStatus, setPhotoStatus] = useState<string>();

    useEffect(() => {
        if (route.params) {
            getDoorUser(route.params.id).then((r) => {
                if (route.params?.name === name) {
                    setName(r.name);
                }
                if (route.params?.description === description) {
                    setDescription(r.description);
                }
            });
            getDoorUserPhotos(route.params.id).then(setPhotos);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return cameraOn ? (
        <Camera
            onPress={(uri) => {
                setPhotoStatus("上传中……");
                setCameraOn(false);
                route.params &&
                    addDoorUserPhotos(route.params.id, uri)
                        .then(() =>
                            route.params
                                ? getDoorUserPhotos(route.params.id)
                                : Promise.resolve<AuthConfig[]>([]),
                        )
                        .then((r) => {
                            setPhotos(r);
                            setPhotoStatus("上传成功");
                        });
            }}
        />
    ) : (
        <View style={{alignItems: "center"}}>
            <TextInput
                testID="modifyUserName"
                placeholder="姓名"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                testID="modifyUserDescription"
                placeholder="备注信息"
                value={description}
                onChangeText={setDescription}
            />
            {route.params && (
                <Button title="拍照" onPress={() => setCameraOn(true)} />
            )}
            {photoStatus && <Text>{photoStatus}</Text>}
            <FlatList
                data={photos}
                renderItem={({item}) => (
                    <Image source={item} style={{height: 400, width: 400}} />
                )}
                keyExtractor={({uri}) => uri}
                style={{height: "50%"}}
            />
            <Button
                title="保存"
                onPress={() => {
                    Snackbar.show({
                        text: "处理中……",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    (route.params === undefined
                        ? createDoorUser(name, description)
                        : updateDoorUser({...route.params, name, description})
                    )
                        .then(({msg}: {msg: string}) => {
                            navigation.navigate("UserList", {
                                refreshTimestamp: new Date().valueOf(),
                            });
                            Snackbar.show({
                                text: msg,
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        })
                        .catch((e) =>
                            Snackbar.show({
                                text: e,
                                duration: Snackbar.LENGTH_SHORT,
                            }),
                        );
                }}
                testID="modifyUserSubmit"
            />
        </View>
    );
};
