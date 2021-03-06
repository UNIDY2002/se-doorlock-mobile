import React from "react";
import {FlatList, Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {connect} from "react-redux";
import {State} from "../../redux/store";
import {RectButton} from "react-native-gesture-handler";
import {simpleAlert} from "../../utils/alerts";
import Snackbar from "react-native-snackbar";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {AdvancedNav} from "./advancedStack";
import {Activity} from "../../redux/states/config";
import {REMOVE_ACTIVITY} from "../../redux/constants";
import dayjs from "dayjs";
import {DayOfWeek, dayOfWeekToString} from "../../utils/dayOfWeek";

const pad = (data: number) => {
    const str = String(data);
    return str.length === 2 ? str : `0${str}`;
};

const ActivitiesUI = ({
    activities,
    navigation,
    remove,
}: {
    activities: Activity[];
    navigation: AdvancedNav;
    remove: (activity: Activity) => void;
}) => (
    <FlatList
        data={activities}
        renderItem={({item}) => (
            <Swipeable
                renderRightActions={() => (
                    <RectButton
                        style={{
                            width: 80,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            simpleAlert(
                                "您确定要删除吗？",
                                "该操作无法撤销",
                                () => {
                                    remove(item);
                                    Snackbar.show({
                                        text: "已删除",
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                                },
                            );
                        }}
                        testID="activitySwipeable">
                        <Icon name="trash" size={40} color="tomato" />
                    </RectButton>
                )}>
                <TouchableOpacity
                    style={Material.card}
                    onPress={() => {
                        if (item.repeat.includes(dayjs().day() as DayOfWeek)) {
                            navigation.navigate("ActivityDetail", item);
                        } else {
                            simpleAlert(
                                "今天没有打卡活动",
                                undefined,
                                () => {},
                            );
                        }
                    }}
                    testID="activityItem">
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>
                        重复：{item.repeat.map(dayOfWeekToString).join(" ")}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        起始时间：{pad(item.beginHour)}:{pad(item.beginMinute)}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        终止时间：{pad(item.endHour)}:{pad(item.endMinute)}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        适用门禁：{item.devices.map((it) => `#${it}`).join(" ")}
                    </Text>
                </TouchableOpacity>
            </Swipeable>
        )}
        keyExtractor={({
            repeat,
            beginHour,
            beginMinute,
            endHour,
            endMinute,
            users,
        }) =>
            `[${repeat}]${beginHour}:${beginMinute}-${endHour}:${endMinute} (${users})`
        }
    />
);

export const ActivitiesScreen = connect(
    (state: State) => state.config,
    (dispatch) => ({
        remove: (activity: Activity) =>
            dispatch({type: REMOVE_ACTIVITY, payload: activity}),
    }),
)(ActivitiesUI);
