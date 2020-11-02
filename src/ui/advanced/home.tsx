import React from "react";
import {AdvancedNav} from "./advancedStack";
import {ScrollView} from "react-native";
import {Separator, TouchableItem} from "../../components/touchableItems";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {simpleAlert} from "../../utils/alerts";
import {store} from "../../redux/store";
import {DO_LOGOUT} from "../../redux/constants";

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
        <Separator />
        <TouchableItem
            text="注销"
            onPress={() =>
                simpleAlert("注销", "您确定要注销吗？", () => {
                    store.dispatch({type: DO_LOGOUT, payload: undefined});
                })
            }
            icon={<Feather name="user-x" size={16} />}
            testID="logout"
        />
    </ScrollView>
);
