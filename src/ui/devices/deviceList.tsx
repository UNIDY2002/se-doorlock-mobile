import React, {useEffect, useState} from "react";
import {DevicesNav} from "./devicesStack";
import {FlatList, Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {Device} from "../../models/users";
import Snackbar from "react-native-snackbar";
import {getDoorDevices} from "../../network/devices";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DeviceListScreen = ({navigation}: {navigation: DevicesNav}) => {
    const [devices, setDevices] = useState<Device[]>([]);

    const refresh = () => {
        getDoorDevices()
            .then(setDevices)
            .catch(() =>
                Snackbar.show({
                    text: "网络异常，请重试",
                    duration: Snackbar.LENGTH_SHORT,
                }),
            );
    };

    useEffect(refresh, []);

    return (
        <FlatList
            data={devices}
            renderItem={({item}) => (
                <TouchableOpacity style={Material.card}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>
                        {item.description}
                    </Text>
                    <Text style={{lineHeight: 24}}>编号：{item.id}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.description}
        />
    );
};
