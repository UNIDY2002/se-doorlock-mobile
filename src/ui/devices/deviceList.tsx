import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {getDoorDevices} from "../../network/devices";
import {simpleRefreshList} from "../../components/simpleRefreshList";
import {DevicesNav} from "./devicesStack";

export const DeviceListScreen = simpleRefreshList(
    getDoorDevices,
    ({id, description}, _, {navigation}: {navigation: DevicesNav}) => (
        <TouchableOpacity
            style={Material.card}
            onPress={() => navigation.navigate("DeviceHistory", {deviceId: id})}
            testID="DeviceItemInList">
            <Text style={{fontSize: 20, fontWeight: "bold"}}>
                {description}
            </Text>
            <Text style={{lineHeight: 24}}>编号：{id}</Text>
        </TouchableOpacity>
    ),
    (item) => item.description,
);
