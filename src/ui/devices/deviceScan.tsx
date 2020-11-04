import {DevicesNav} from "./devicesStack";
import React, {useState} from "react";
import {Camera} from "../../components/camera";
import {bindDoorAdmin} from "../../network/devices";
import Snackbar from "react-native-snackbar";

export const DeviceScanScreen = ({navigation}: {navigation: DevicesNav}) => {
    const setCaptured = useState(false)[1];
    return (
        <Camera
            onBarCode={(uuid) => {
                setCaptured((original) => {
                    if (!original) {
                        bindDoorAdmin(uuid)
                            .then(() =>
                                Snackbar.show({
                                    text: "绑定成功",
                                    duration: Snackbar.LENGTH_SHORT,
                                }),
                            )
                            .catch(() =>
                                Snackbar.show({
                                    text: "绑定失败，请重试",
                                    duration: Snackbar.LENGTH_SHORT,
                                }),
                            )
                            .then(() =>
                                navigation.navigate("DeviceList", {
                                    refreshTimestamp: new Date().valueOf(),
                                }),
                            );
                    }
                    return true;
                });
            }}
            testID="scanQrCamera"
        />
    );
};
