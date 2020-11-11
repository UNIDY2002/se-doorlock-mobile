import {
    Dimensions,
    ScrollView,
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
import {Device} from "../../models/devices";
import {getDoorDevices} from "../../network/devices";
import {NameAndGender} from "../../utils/forms";

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
    const [useDevices, setUseDevices] = useState<number[]>([]);
    const [allDevices, setAllDevices] = useState<Device[]>([]);

    useEffect(() => {
        if (route.params) {
            getDoorUser(route.params.id).then(([user, images]) => {
                setName((o) => (route.params?.name === o ? user.name : o));
                setGender((o) =>
                    route.params?.gender === o ? user.gender : o,
                );
                setDescription((o) =>
                    route.params?.description === o ? user.description : o,
                );
                setPhotos(images);
                setUseDevices(user.useDevices);
            });
        }
        getDoorDevices().then(setAllDevices);
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
        <ScrollView style={{flex: 1}}>
            <View style={{alignItems: "center"}}>
                <NameAndGender
                    name={name}
                    setName={setName}
                    gender={gender}
                    setGender={setGender}
                    genderOptions={["男", "女", "未知"]}
                />
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
                    <Text style={{flex: 1, textAlign: "center"}}>可用门禁</Text>
                    <View style={{flex: 2}}>
                        {allDevices.map((device) => (
                            <TouchableOpacity
                                style={form.row}
                                key={device.id}
                                testID={"setUseDevices-" + device.id}
                                onPress={() =>
                                    setUseDevices((prevState) =>
                                        prevState.indexOf(device.id) === -1
                                            ? prevState.concat(device.id)
                                            : prevState.filter(
                                                  (it) => it !== device.id,
                                              ),
                                    )
                                }>
                                <Text style={{flex: 1, textAlign: "center"}}>
                                    {device.description}
                                </Text>
                                <Text style={{flex: 1, textAlign: "center"}}>
                                    {useDevices.indexOf(device.id) === -1
                                        ? "不选"
                                        : "选"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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
                                      useDevices,
                                      photos.map(({src}) => src),
                                  )
                                : updateDoorUser(
                                      {
                                          ...route.params,
                                          name,
                                          description,
                                          gender,
                                          useDevices,
                                      },
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
                {route.params && (
                    <View style={form.row}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: "#CCC",
                                padding: 10,
                                marginHorizontal: 30,
                            }}
                            onPress={() =>
                                route.params &&
                                navigation.navigate("UserHistory", {
                                    userId: route.params.id,
                                })
                            }
                            testID="viewUserHistoryButton">
                            <Text style={{textAlign: "center"}}>
                                查看出入记录
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {photos.map((item) => (
                    <TouchableWithoutFeedback
                        onPress={() =>
                            simpleAlert("确定要删除照片吗？", undefined, () =>
                                setPhotos((o) => o.filter((it) => it !== item)),
                            )
                        }
                        key={item.uri}
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
                ))}
            </View>
        </ScrollView>
    );
};
