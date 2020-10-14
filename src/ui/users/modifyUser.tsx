import {Button, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {ModifyUserRouteProp, UsersNav} from "./usersStack";
import {createDoorUser, getDoorUser, updateDoorUser} from "../../network/users";
import Snackbar from "react-native-snackbar";

export const ModifyUserScreen = ({
    navigation,
    route,
}: {
    navigation: UsersNav;
    route: ModifyUserRouteProp;
}) => {
    const [name, setName] = useState(route.params?.name ?? "");
    const [description, setDescription] = useState(
        route.params?.description ?? "",
    );

    useEffect(() => {
        if (route.params) {
            getDoorUser(route.params.id).then((r) => {
                if (route.params?.name === name) {
                    setName(r.name);
                }
                if (route.params?.description === description) {
                    setDescription(r.description);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    (route.params === undefined
                        ? createDoorUser(name, description)
                        : updateDoorUser({...route.params, name, description})
                    )
                        .then(({msg}: {msg: string}) => {
                            navigation.pop(); // TODO: auto refresh upon returning
                            Snackbar.show({
                                text: msg,
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        })
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
