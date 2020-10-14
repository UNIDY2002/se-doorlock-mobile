import React from "react";
import {UsersNav} from "./usersStack";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {deleteDoorUser, getDoorUsers} from "../../network/users";
import {simpleRefreshList} from "../../components/simpleRefreshList";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {RectButton} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Snackbar from "react-native-snackbar";
import {simpleAlert} from "../../utils/alerts";

export const UserListScreen = simpleRefreshList(
    getDoorUsers,
    (item, refresh, {navigation}: {navigation: UsersNav}) => (
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
                                deleteDoorUser(item.id)
                                    .then(({msg}: {msg: string}) =>
                                        Snackbar.show({
                                            text: msg,
                                            duration: Snackbar.LENGTH_SHORT,
                                        }),
                                    )
                                    .catch((e) =>
                                        Snackbar.show({
                                            text: e,
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
                onPress={() => navigation.navigate("ModifyUser", item)}
                testID="userItem">
                <Text style={{fontSize: 20, fontWeight: "bold"}}>
                    {item.name}
                </Text>
                <Text style={{lineHeight: 24}}>{item.description}</Text>
            </TouchableOpacity>
        </Swipeable>
    ),
    (item) => item.name,
);
