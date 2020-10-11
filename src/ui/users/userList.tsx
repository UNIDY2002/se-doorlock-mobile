import React, {useEffect, useState} from "react";
import {UsersNav} from "./usersStack";
import {FlatList, Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";
import {User} from "../../models/users";
import {getDoorUsers} from "../../network/users";
import Snackbar from "react-native-snackbar";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UserListScreen = ({navigation}: {navigation: UsersNav}) => {
    const [users, setUsers] = useState<User[]>([]);

    const refresh = () => {
        getDoorUsers()
            .then(setUsers)
            .catch(() =>
                Snackbar.show({
                    text: "网络异常，请重试",
                    duration: Snackbar.LENGTH_SHORT,
                }),
            );
    };

    useEffect(refresh, []);

    return (
        <FlatList
            data={users}
            renderItem={({item}) => (
                <TouchableOpacity style={Material.card}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>
                        {item.name}
                    </Text>
                    <Text style={{lineHeight: 24}}>{item.description}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
        />
    );
};
