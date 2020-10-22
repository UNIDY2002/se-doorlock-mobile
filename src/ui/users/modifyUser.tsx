import {
    Dimensions,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {ModifyUserRouteProp, UsersNav} from "./usersStack";
import {createDoorUser, getDoorUser, updateDoorUser} from "../../network/users";
import Snackbar from "react-native-snackbar";
import {Camera} from "../../components/camera";
import {AuthConfig, Gender} from "../../models/users";
import {postFile} from "../../network/core";
import {simpleAlert} from "../../utils/alerts";
import form from "../../styles/form";

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
        <TouchableOpacity
            onPress={() => setValue(item)}
            style={{padding: 5}}
            testID={`selectItem${item}`}>
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
                setCameraOn(false);
                Snackbar.show({
                    text: "上传中……",
                    duration: Snackbar.LENGTH_SHORT,
                });
                postFile("image/jpeg", uri, "photo.jpg")
                    .then((r) => {
                        setPhotos((o) => o.concat(r));
                        Snackbar.show({
                            text: "上传成功",
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    })
                    .catch(() =>
                        Snackbar.show({
                            text: "上传失败，请重试",
                            duration: Snackbar.LENGTH_SHORT,
                        }),
                    );
            }}
        />
    ) : (
        <View style={{alignItems: "center", flex: 1}}>
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>姓名</Text>
                <TextInput
                    style={{flex: 2}}
                    testID="modifyUserName"
                    placeholder="姓名"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>性别</Text>
                <View style={{flexDirection: "row", flex: 2}}>
                    <SelectorItem
                        item="男"
                        value={gender}
                        setValue={setGender}
                    />
                    <SelectorItem
                        item="女"
                        value={gender}
                        setValue={setGender}
                    />
                    <SelectorItem
                        item="未知"
                        value={gender}
                        setValue={setGender}
                    />
                </View>
            </View>
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>备注信息</Text>
                <TextInput
                    style={{flex: 2}}
                    testID="modifyUserDescription"
                    placeholder="备注信息"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={form.row}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: "#CCC",
                        padding: 10,
                        marginHorizontal: 30,
                    }}
                    onPress={() => setCameraOn(true)}
                    testID="modifyUserCameraButton">
                    <Text style={{textAlign: "center"}}>添加照片</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: "#CCC",
                        padding: 10,
                        marginHorizontal: 30,
                    }}
                    onPress={() => {
                        Snackbar.show({
                            text: "处理中……",
                            duration: Snackbar.LENGTH_SHORT,
                        });
                        (route.params === undefined
                            ? createDoorUser(
                                  name,
                                  description,
                                  gender,
                                  photos.map(({src}) => src),
                              )
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
                    testID="modifyUserSubmit">
                    <Text style={{textAlign: "center"}}>保存</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={photos}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback
                        onPress={() =>
                            simpleAlert("确定要删除照片吗？", undefined, () =>
                                setPhotos((o) => o.filter((it) => it !== item)),
                            )
                        }
                        testID="userPhotoTouchable">
                        <Image
                            source={item}
                            style={{
                                height: Dimensions.get("window").width * 0.8,
                                width: Dimensions.get("window").width * 0.8,
                                borderWidth: 1,
                                borderColor: "#CCC",
                            }}
                            resizeMode="contain"
                        />
                    </TouchableWithoutFeedback>
                )}
                keyExtractor={({uri}) => uri}
                style={{flex: 1}}
            />
        </View>
    );
};
