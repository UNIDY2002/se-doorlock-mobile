import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {UserListScreen} from "./userList";

export type UsersStackParamList = {
    UserList: undefined;
};

const Stack = createStackNavigator<UsersStackParamList>();

export type UsersNav = StackNavigationProp<UsersStackParamList>;

export const UsersStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="UserList"
            component={UserListScreen}
            options={{title: "用户"}}
        />
    </Stack.Navigator>
);
