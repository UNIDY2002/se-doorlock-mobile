import React, {useState} from "react";
import {AdvancedNav} from "./advancedStack";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {Gender} from "../../models/users";
import form from "../../styles/form";
import {DatePickerTrigger} from "../../components/DatePickerTrigger";
import dayjs from "dayjs";
import {NameAndGender} from "../../utils/forms";

export const AdvancedQueryScreen = ({
    navigation,
}: {
    navigation: AdvancedNav;
}) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState<Gender | "不选">("不选");
    const [deviceId, setDeviceId] = useState("");
    const [begin, setBegin] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    return (
        <ScrollView style={{padding: 10}}>
            <NameAndGender
                name={name}
                setName={setName}
                gender={gender}
                setGender={setGender}
                genderOptions={["男", "女", "未知", "不选"]}
            />
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>设备ID</Text>
                <TextInput
                    style={{flex: 2}}
                    testID="advancedDeviceId"
                    placeholder="备注信息"
                    value={deviceId}
                    onChangeText={setDeviceId}
                />
            </View>
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>起始日期</Text>
                <DatePickerTrigger
                    date={begin}
                    onChange={setBegin}
                    text="设置起始日期"
                    flex={2}
                />
            </View>
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>终止日期</Text>
                <DatePickerTrigger
                    date={end}
                    onChange={setEnd}
                    text="设置终止日期"
                    flex={2}
                />
            </View>
            <View style={form.row}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: "#ccc",
                        marginHorizontal: 30,
                        padding: 10,
                    }}
                    onPress={() =>
                        navigation.navigate("AdvancedHistory", {
                            name,
                            gender: gender === "不选" ? undefined : gender,
                            deviceId:
                                String(Number(deviceId)) === deviceId
                                    ? Number(deviceId)
                                    : undefined,
                            begin: dayjs(begin)
                                .startOf("date")
                                .toDate()
                                .valueOf(),
                            end: dayjs(end).endOf("date").toDate().valueOf(),
                        })
                    }
                    testID="enterAdvancedHistory">
                    <Text style={{textAlign: "center"}}>查询</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
