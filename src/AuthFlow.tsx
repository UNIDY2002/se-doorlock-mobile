import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {LoginScreen} from "./ui/login/login";
import {RegisterScreen} from "./ui/login/register";

export type LoginStackParamList = {
    Login: undefined;
    Register: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

export type LoginNav = StackNavigationProp<LoginStackParamList>;

export const AuthFlow = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);
