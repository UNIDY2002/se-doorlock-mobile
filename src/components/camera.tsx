import {RNCamera} from "react-native-camera";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {simpleAlert} from "../utils/alerts";

export const Camera = () => (
    <View style={{backgroundColor: "black", flex: 1}}>
        <RNCamera
            style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
            }}
            androidCameraPermissionOptions={{
                title: "请求使用相机",
                message: "我们需要使用相机以扫描设备二维码和采集人脸数据",
                buttonPositive: "确认",
                buttonNegative: "取消",
            }}
            captureAudio={false}>
            {({camera, status}) =>
                status === "READY" ? (
                    <View
                        style={{
                            flex: 0,
                            flexDirection: "row",
                            justifyContent: "center",
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                camera
                                    .takePictureAsync({
                                        quality: 0.9,
                                        base64: true,
                                    })
                                    .then(({uri}) => {
                                        simpleAlert("uri", uri, () => {});
                                    });
                            }}
                            style={{
                                flex: 0,
                                backgroundColor: "#fff",
                                borderRadius: 5,
                                padding: 15,
                                paddingHorizontal: 20,
                                alignSelf: "center",
                                margin: 20,
                            }}>
                            <Text style={{fontSize: 14}}>拍照</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "lightgreen",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text>加载中……</Text>
                    </View>
                )
            }
        </RNCamera>
    </View>
);
