import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {HomeScreen} from "./home";

export type AdvancedStackParamList = {
    Home: undefined;
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
    </Stack.Navigator>
);
