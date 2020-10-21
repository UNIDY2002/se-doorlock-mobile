import {
    Button,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
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
import {AuthConfig, Gender} from "../../models/users";

function SelectorItem<T>({
    item,
    value,
    setValue,
}: {
    item: T;
    value: T;
    setValue: (newValue: T) => void;
}) {
    return (
        <TouchableOpacity onPress={() => setValue(item)} style={{padding: 5}}>
            <Text style={{color: item === value ? "tomato" : "black"}}>
                {item}
            </Text>
        </TouchableOpacity>
    );
}

export const ModifyUserScreen = ({
    navigation,
    route,
}: {
    navigation: UsersNav;
    route: ModifyUserRouteProp;
}) => {
    const [name, setName] = useState(route.params?.name ?? "");
    const [gender, setGender] = useState<Gender>(
        route.params?.gender ?? "未知",
    );
    const [description, setDescription] = useState(
        route.params?.description ?? "",
    );
    const [cameraOn, setCameraOn] = useState(false);
    const [photos, setPhotos] = useState<AuthConfig[]>([]);
    const [photoStatus, setPhotoStatus] = useState<string>();

    useEffect(() => {
        if (route.params) {
            getDoorUser(route.params.id).then(([user, images]) => {
                if (route.params?.name === name) {
                    setName(user.name);
                }
                if (route.params?.gender === gender) {
                    setGender(user.gender);
                }
                if (route.params?.description === description) {
                    setDescription(user.description);
                }
                setPhotos(images);
            });
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
            <View style={{flexDirection: "row"}}>
                <SelectorItem item="男" value={gender} setValue={setGender} />
                <SelectorItem item="女" value={gender} setValue={setGender} />
                <SelectorItem item="未知" value={gender} setValue={setGender} />
            </View>
            <TextInput
                testID="modifyUserDescription"
                placeholder="备注信息"
                value={description}
                onChangeText={setDescription}
            />
            {route.params && (
                <Button
                    title="拍照"
                    onPress={() => setCameraOn(true)}
                    testID="modifyUserCameraButton"
                />
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
                        : updateDoorUser(
                              {...route.params, name, description, gender},
                              photos.map(({src}) => src),
                          )
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
                        .catch(() =>
                            Snackbar.show({
                                text: "请求失败，请重试",
                                duration: Snackbar.LENGTH_SHORT,
                            }),
                        );
                }}
                testID="modifyUserSubmit"
            />
        </View>
    );
};
