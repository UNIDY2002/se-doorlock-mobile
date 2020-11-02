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
                        }}>
                        <Icon name="trash" size={40} color="tomato" />
                    </RectButton>
                )}>
                <TouchableOpacity
                    style={Material.card}
                    onPress={() => navigation.navigate("AdvancedHistory", {})}
                    testID="activityItem">
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>
                        重复：{item.repeat}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        起始时间：{pad(item.beginHour)}:{pad(item.beginMinute)}
                    </Text>
                    <Text style={{fontSize: 16}}>
                        终止时间：{pad(item.endHour)}:{pad(item.endMinute)}
                    </Text>
                </TouchableOpacity>
            </Swipeable>
        )}
        keyExtractor={({repeat, beginHour, beginMinute, endHour, endMinute}) =>
            `[${repeat}]${beginHour}:${beginMinute}-${endHour}:${endMinute}`
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
