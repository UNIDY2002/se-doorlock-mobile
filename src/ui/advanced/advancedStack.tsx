import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {HomeScreen} from "./home";
import {AdvancedQueryScreen} from "./advancedQuery";
import {Query} from "../../models/history";
import {HistoryScreen} from "../general/history";

export type AdvancedStackParamList = {
    Home: undefined;
    AdvancedQuery: undefined;
    AdvancedHistory: {query: Query};
};

const Stack = createStackNavigator<AdvancedStackParamList>();

export type AdvancedNav = StackNavigationProp<AdvancedStackParamList>;

export const AdvancedStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: "高级"}}
        />
        <Stack.Screen
            name="AdvancedQuery"
            component={AdvancedQueryScreen}
            options={{title: "高级查询"}}
        />
        <Stack.Screen
            name="AdvancedHistory"
            component={HistoryScreen}
            options={{title: "查询结果"}}
        />
    </Stack.Navigator>
);
