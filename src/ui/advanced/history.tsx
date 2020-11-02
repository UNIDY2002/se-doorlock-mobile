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

const ActivitiesUI = ({
    activities,
    navigation,
}: {
    activities: any[];
    navigation: AdvancedNav;
}) => (
    <FlatList
        data={activities}
        renderItem={(_) => (
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
                                    Snackbar.show({
                                        text: "处理中……",
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
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>打卡</Text>
                </TouchableOpacity>
            </Swipeable>
        )}
    />
);

export const ActivitiesScreen = connect((_: State) => ({activities: []}))(
    ActivitiesUI,
);
