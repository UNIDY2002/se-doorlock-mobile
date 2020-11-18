import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {simpleRefreshList} from "../../components/simpleRefreshList";
import {getActivityDetail} from "../../network/history";
import dayjs from "dayjs";

export const ActivityDetailScreen = simpleRefreshList(
    ({route}) => getActivityDetail(route.params),
    ({name, deviceId, time, deviceDescription}) => (
        <TouchableOpacity style={Material.card} testID="userHistoryItem">
            <Text style={{fontSize: 20, fontWeight: "bold"}}>
                {name}
                {(deviceId === undefined || time === undefined) && (
                    <Text style={{color: "red"}}> [未打卡]</Text>
                )}
            </Text>
            {deviceId && deviceDescription && (
                <Text style={{lineHeight: 24}}>
                    进入门禁 {deviceDescription} (#{deviceId})
                </Text>
            )}
            {time && (
                <Text style={{lineHeight: 24}}>
                    时间 {dayjs(time).format("YYYY-MM-DD HH:mm:ss")}
                </Text>
            )}
        </TouchableOpacity>
    ),
    (item) => String(item.userId),
);
