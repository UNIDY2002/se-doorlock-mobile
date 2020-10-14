import React from "react";
import {UsersNav} from "../users/usersStack";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {getDoorDevices} from "../../network/devices";
import {simpleRefreshList} from "../../components/simpleRefreshList";

export const DeviceListScreen = simpleRefreshList(
    getDoorDevices,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (item, _, {navigation}: {navigation: UsersNav}) => (
        <TouchableOpacity style={Material.card}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>
                {item.description}
            </Text>
            <Text style={{lineHeight: 24}}>编号：{item.id}</Text>
        </TouchableOpacity>
    ),
    (item) => item.description,
);
