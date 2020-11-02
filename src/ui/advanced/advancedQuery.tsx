import React, {useState} from "react";
import {AdvancedNav} from "./advancedStack";
import {ScrollView, Text, TextInput, View} from "react-native";
import {SelectorItem, TouchableItem} from "../../components/touchableItems";
import Icon from "react-native-vector-icons/FontAwesome";
import {Gender} from "../../models/users";
import form from "../../styles/form";
import {DatePickerTrigger} from "../../components/DatePickerTrigger";

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
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>姓名</Text>
                <TextInput
                    style={{flex: 2}}
                    testID="advancedName"
                    placeholder="姓名"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={form.row}>
                <Text style={{flex: 1, textAlign: "center"}}>性别</Text>
                <View style={{flexDirection: "row", flex: 2}}>
                    <SelectorItem
                        item="男"
                        value={gender}
                        setValue={setGender}
                    />
                    <SelectorItem
                        item="女"
                        value={gender}
                        setValue={setGender}
                    />
                    <SelectorItem
                        item="未知"
                        value={gender}
                        setValue={setGender}
                    />
                    <SelectorItem
                        item="不选"
                        value={gender}
                        setValue={setGender}
                    />
                </View>
            </View>
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
            <TouchableItem
                text="查询"
                onPress={() =>
                    navigation.navigate("AdvancedHistory", {
                        name,
                        gender: gender === "不选" ? undefined : gender,
                        deviceId:
                            String(Number(deviceId)) === deviceId
                                ? Number(deviceId)
                                : undefined,
                    })
                }
                icon={<Icon name="play" size={16} />}
                testID="enterAdvancedHistory"
            />
        </ScrollView>
    );
};
