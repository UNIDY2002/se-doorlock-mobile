import React from "react";
import {UsersNav} from "./usersStack";
import {FlatList, Text, TouchableOpacity} from "react-native";
import {Material} from "../../styles/material";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UserListScreen = ({navigation}: {navigation: UsersNav}) => {
    const demoList = [
        {name: "小熊维尼", description: "一只可爱的小熊，跳跳虎的好朋友"},
        {name: "小猪佩奇", description: "吹风机"},
    ];
    return (
        <FlatList
            data={demoList}
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
