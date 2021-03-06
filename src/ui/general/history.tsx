import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {simpleRefreshList} from "../../components/simpleRefreshList";
import {getHistory} from "../../network/history";
import dayjs from "dayjs";

export const HistoryScreen = simpleRefreshList(
    ({route}) => getHistory(route.params),
    ({id, userName, deviceId, time, deviceDescription}) => (
        <TouchableOpacity style={Material.card} testID="userHistoryItem">
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{userName}</Text>
            <Text style={{lineHeight: 24}}>
                进入门禁 {deviceDescription} (#{deviceId})
            </Text>
            <Text style={{lineHeight: 24}}>
                时间 {dayjs(time).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
            <Text style={{lineHeight: 24}}>记录编号 #{id}</Text>
        </TouchableOpacity>
    ),
    (item) => String(item.id),
);
