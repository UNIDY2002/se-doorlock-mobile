import React from "react";
import {AdvancedNav} from "./advancedStack";
import {ScrollView} from "react-native";
import {TouchableItem} from "../../components/touchableItems";
import Icon from "react-native-vector-icons/FontAwesome";

export const HomeScreen = ({navigation}: {navigation: AdvancedNav}) => (
    <ScrollView style={{padding: 10}}>
        <TouchableItem
            text="高级查找"
            onPress={() => navigation.navigate("AdvancedQuery")}
            icon={<Icon name="plus" size={16} />}
            testID="enterAdvancedQuery"
        />
        <TouchableItem
            text="打卡"
            onPress={() => navigation.navigate("Activities")}
            icon={<Icon name="clock-o" size={16} />}
            testID="enterActivities"
        />
    </ScrollView>
);
