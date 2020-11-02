import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {getDoorUsers} from "../../network/users";
import Snackbar from "react-native-snackbar";
import {User} from "../../models/users";
import form from "../../styles/form";
import {AdvancedNav} from "./advancedStack";

export const AddActivityScreen = ({navigation}: {navigation: AdvancedNav}) => {
    const [repeat, setRepeat] = useState("12345");
    const [beginHour, setBeginHour] = useState("07");
    const [beginMinute, setBeginMinute] = useState("00");
    const [endHour, setEndHour] = useState("09");
    const [endMinute, setEndMinute] = useState("00");
    const [users, setUsers] = useState<number[]>([]);
    const [userData, setUserData] = useState<User[]>([]);

    useEffect(() => {
        getDoorUsers()
            .then(setUserData)
            .catch(() => {
                navigation.pop();
                Snackbar.show({
                    text: "网络异常，请稍后重试。",
                    duration: Snackbar.LENGTH_SHORT,
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ScrollView style={{flex: 1}}>
            <View style={{alignItems: "center", flex: 1}}>
                <View style={form.row}>
                    <Text style={{flex: 1, textAlign: "center"}}>重复</Text>
                    <TextInput
                        style={{flex: 2, textAlign: "center"}}
                        testID="addActivityRepeat"
                        value={repeat}
                        onChangeText={setRepeat}
                    />
                </View>
                <View style={form.row}>
                    <Text style={{flex: 1, textAlign: "center"}}>开始时间</Text>
                    <TextInput
                        style={{flex: 1, textAlign: "right"}}
                        testID="addActivityBeginHour"
                        value={beginHour}
                        onChangeText={setBeginHour}
                    />
                    <Text>:</Text>
                    <TextInput
                        style={{flex: 1}}
                        testID="addActivityBeginMinute"
                        value={beginMinute}
                        onChangeText={setBeginMinute}
                    />
                </View>
                <View style={form.row}>
                    <Text style={{flex: 1, textAlign: "center"}}>结束时间</Text>
                    <TextInput
                        style={{flex: 1, textAlign: "right"}}
                        testID="addActivityEndHour"
                        value={endHour}
                        onChangeText={setEndHour}
                    />
                    <Text>:</Text>
                    <TextInput
                        style={{flex: 1}}
                        testID="addActivityEndMinute"
                        value={endMinute}
                        onChangeText={setEndMinute}
                    />
                </View>
                {userData.map(({name, id}) => (
                    <TouchableOpacity
                        style={form.row}
                        key={id}
                        onPress={() =>
                            setUsers((prevState) =>
                                prevState.indexOf(id) === -1
                                    ? prevState.concat(id)
                                    : prevState.filter((it) => it !== id),
                            )
                        }>
                        <Text style={{flex: 1, textAlign: "center"}}>
                            {name}
                        </Text>
                        <Text style={{flex: 1, textAlign: "center"}}>
                            {users.indexOf(id) === -1 ? "不选" : "选"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};
