import {Button, TextInput, View} from "react-native";
import React, {useState} from "react";
import {ModifyUserRouteProp, UsersNav} from "./usersStack";
import {createDoorUser} from "../../network/users";
import Snackbar from "react-native-snackbar";

export const ModifyUserScreen = ({
    navigation,
    route,
}: {
    navigation: UsersNav;
    route: ModifyUserRouteProp;
}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <View style={{alignItems: "center"}}>
            <TextInput
                testID="modifyUserName"
                placeholder="姓名"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                testID="modifyUserDescription"
                placeholder="备注信息"
                value={description}
                onChangeText={setDescription}
            />
            <Button
                title="保存"
                onPress={() => {
                    Snackbar.show({
                        text: "处理中……",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    route.params === undefined &&
                        createDoorUser({name, description})
                            .then(
                                ({
                                    error_code,
                                    msg,
                                }: {
                                    error_code: number;
                                    msg: string;
                                }) => {
                                    if (error_code === 0) {
                                        navigation.pop(); // TODO: auto refresh upon returning
                                        Snackbar.show({
                                            text: msg,
                                            duration: Snackbar.LENGTH_SHORT,
                                        });
                                    } else {
                                        throw new Error(msg);
                                    }
                                },
                            )
                            .catch((e) =>
                                Snackbar.show({
                                    text: e,
                                    duration: Snackbar.LENGTH_SHORT,
                                }),
                            );
                }}
                testID="modifyUserSubmit"
            />
        </View>
    );
};
