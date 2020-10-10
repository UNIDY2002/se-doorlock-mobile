import React from "react";
import {DevicesNav} from "./devicesStack";
import {FlatList, Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DeviceListScreen = ({navigation}: {navigation: DevicesNav}) => {
    const demoList = [
        {name: "一楼大门", id: "1"},
        {name: "二楼侧门", id: "2"},
        {name: "第三个门禁", id: "3"},
    ];
    return (
        <FlatList
            data={demoList}
            renderItem={({item}) => (
                <TouchableOpacity style={Material.card}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>
                        {item.name}
                    </Text>
                    <Text style={{lineHeight: 24}}>编号：{item.id}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
        />
    );
};
