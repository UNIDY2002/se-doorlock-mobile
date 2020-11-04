import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {getDoorDevices, unbindDoorAdmin} from "../../network/devices";
import {simpleRefreshList} from "../../components/simpleRefreshList";
import {DevicesNav} from "./devicesStack";
import {RectButton} from "react-native-gesture-handler";
import {simpleAlert} from "../../utils/alerts";
import Snackbar from "react-native-snackbar";
import Icon from "react-native-vector-icons/FontAwesome";
import Swipeable from "react-native-gesture-handler/Swipeable";

export const DeviceListScreen = simpleRefreshList(
    getDoorDevices,
    ({id, description}, refresh, {navigation}: {navigation: DevicesNav}) => (
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
                            "您确定要解除绑定吗？",
                            "该操作无法撤销",
                            () => {
                                Snackbar.show({
                                    text: "处理中……",
                                    duration: Snackbar.LENGTH_SHORT,
                                });
                                unbindDoorAdmin(id)
                                    .then(() =>
                                        Snackbar.show({
                                            text: "解绑成功",
                                            duration: Snackbar.LENGTH_SHORT,
                                        }),
                                    )
                                    .catch(() =>
                                        Snackbar.show({
                                            text: "解绑失败，请重试",
                                            duration: Snackbar.LENGTH_SHORT,
                                        }),
                                    );
                                refresh();
                            },
                        );
                    }}>
                    <Icon name="trash" size={40} color="tomato" />
                </RectButton>
            )}>
            <TouchableOpacity
                style={Material.card}
                onPress={() =>
                    navigation.navigate("DeviceHistory", {deviceId: id})
                }
                testID="DeviceItemInList">
                <Text style={{fontSize: 20, fontWeight: "bold"}}>
                    {description}
                </Text>
                <Text style={{lineHeight: 24}}>编号：{id}</Text>
            </TouchableOpacity>
        </Swipeable>
    ),
    (item) => item.description,
);
