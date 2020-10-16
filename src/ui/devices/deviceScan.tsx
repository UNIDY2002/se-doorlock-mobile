import {DevicesNav} from "./devicesStack";
import React, {useState} from "react";
import {Camera} from "../../components/camera";
import {simpleAlert} from "../../utils/alerts";

export const DeviceScanScreen = ({navigation}: {navigation: DevicesNav}) => {
    const setCaptured = useState(false)[1];
    return (
        <Camera
            onBarCode={(text) => {
                setCaptured((original) => {
                    if (!original) {
                        navigation.navigate("DeviceList", {
                            refreshTimestamp: new Date().valueOf(),
                        });
                        simpleAlert("扫码结果", text, () => {});
                    }
                    return true;
                });
            }}
        />
    );
};
