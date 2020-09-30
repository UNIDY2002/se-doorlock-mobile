import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {LoginScreen} from "./ui/login/login";
import {RegisterScreen} from "./ui/login/register";
import {connect} from "react-redux";
import {State} from "./redux/store";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {UsersStack} from "./ui/users/usersStack";
import {DevicesStack} from "./ui/devices/devicesStack";
import {AdvancedStack} from "./ui/advanced/advancedStack";

export type LoginStackParamList = {
    Login: undefined;
    Register: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

const Tab = createBottomTabNavigator();

export type LoginNav = StackNavigationProp<LoginStackParamList>;

export const AuthFlowComponent = ({loggedIn}: {loggedIn: boolean}) =>
    loggedIn ? (
        <Tab.Navigator>
            <Tab.Screen name="Users" component={UsersStack} />
            <Tab.Screen name="Devices" component={DevicesStack} />
            <Tab.Screen name="Advanced" component={AdvancedStack} />
        </Tab.Navigator>
    ) : (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );

export const AuthFlow = connect((state: State) => ({
    loggedIn: state.auth.loggedIn,
}))(AuthFlowComponent);
