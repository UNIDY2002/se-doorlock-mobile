import React from "react";
import {UsersNav} from "./usersStack";
import {Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {getDoorUsers} from "../../network/users";
import {simpleRefreshList} from "../../components/simpleRefreshList";

export const UserListScreen = simpleRefreshList(
    getDoorUsers,
    (item, _, {navigation}: {navigation: UsersNav}) => (
        <TouchableOpacity
            style={Material.card}
            onPress={() => navigation.navigate("ModifyUser", item)}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.name}</Text>
            <Text style={{lineHeight: 24}}>{item.description}</Text>
        </TouchableOpacity>
    ),
    (item) => item.name,
);
