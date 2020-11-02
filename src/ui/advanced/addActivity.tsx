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
import {connect} from "react-redux";
import {Activity} from "../../redux/states/config";
import {ADD_ACTIVITY} from "../../redux/constants";
import {State} from "../../redux/store";

const hint = (text: string) =>
    Snackbar.show({text, duration: Snackbar.LENGTH_SHORT});

const checkNumRange = (input: string, upperBound: number, message: string) => {
    if (
        /^[0-9]+$/.test(input) &&
        Number(input) >= 0 &&
        Number(input) < upperBound
    ) {
        return true;
    } else {
        hint(message);
        return false;
    }
};

const AddActivityUI = ({
    navigation,
    activities,
    create,
}: {
    navigation: AdvancedNav;
    activities: Activity[];
    create: (activity: Activity) => void;
}) => {
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
                hint("网络异常，请稍后重试。");
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
                        <Text style={{flex: 2, textAlign: "center"}}>
                            {users.indexOf(id) === -1 ? "不选" : "选"}
                        </Text>
                    </TouchableOpacity>
                ))}
                <View style={form.row}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "#CCC",
                            padding: 10,
                            marginHorizontal: 30,
                        }}
                        onPress={() => {
                            if (users.length === 0) {
                                hint("请选择至少一名用户。");
                                return;
                            }
                            if (
                                !(
                                    checkNumRange(
                                        beginHour,
                                        24,
                                        "开始时间格式错误。",
                                    ) &&
                                    checkNumRange(
                                        beginMinute,
                                        60,
                                        "开始时间格式错误。",
                                    ) &&
                                    checkNumRange(
                                        endHour,
                                        24,
                                        "结束时间格式错误。",
                                    ) &&
                                    checkNumRange(
                                        endMinute,
                                        60,
                                        "结束时间格式错误。",
                                    )
                                )
                            ) {
                                return;
                            }
                            const activity: Activity = {
                                repeat: repeat.split("").map(Number),
                                beginHour: Number(beginHour),
                                beginMinute: Number(beginMinute),
                                endHour: Number(endHour),
                                endMinute: Number(endMinute),
                                users,
                            };
                            for (const e of activities) {
                                if (
                                    String(e.repeat.sort()) ===
                                        String(activity.repeat.sort()) &&
                                    e.beginHour === activity.beginHour &&
                                    e.beginMinute === activity.beginMinute &&
                                    e.endHour === activity.endHour &&
                                    e.endMinute === activity.endMinute &&
                                    String(e.users.sort()) ===
                                        String(activity.users.sort())
                                ) {
                                    hint("已有相同打卡活动，请修改后重试。");
                                    return;
                                }
                            }
                            create(activity);
                            navigation.pop();
                        }}
                        testID="submitNewActivity">
                        <Text style={{textAlign: "center"}}>创建打卡</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export const AddActivityScreen = connect(
    (state: State) => state.config,
    (dispatch) => ({
        create: (activity: Activity) =>
            dispatch({type: ADD_ACTIVITY, payload: activity}),
    }),
)(AddActivityUI);
