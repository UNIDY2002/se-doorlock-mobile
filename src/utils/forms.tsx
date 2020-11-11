import {Text, TextInput, View} from "react-native";
import React from "react";
import form from "../styles/form";
import {SelectorItem} from "../components/touchableItems";
import {Gender} from "../models/users";

export const NameAndGender = <T extends Gender | "不选">({
    name,
    setName,
    gender,
    setGender,
    genderOptions,
}: {
    name: string;
    setName: (newName: string) => void;
    gender: T;
    setGender: (newGender: T) => void;
    genderOptions: T[];
}) => (
    <>
        <View style={form.row}>
            <Text style={{flex: 1, textAlign: "center"}}>姓名</Text>
            <TextInput
                style={{flex: 2}}
                testID="modifyUserName"
                placeholder="姓名"
                value={name}
                onChangeText={setName}
            />
        </View>
        <View style={form.row}>
            <Text style={{flex: 1, textAlign: "center"}}>性别</Text>
            <View style={{flexDirection: "row", flex: 2}}>
                {genderOptions.map((option) => (
                    <SelectorItem
                        item={option}
                        value={gender}
                        setValue={setGender}
                        key={option}
                    />
                ))}
            </View>
        </View>
    </>
);
