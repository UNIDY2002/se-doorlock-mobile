import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {UserListScreen} from "./userList";
import {HeaderButton} from "../../components/headerButtons";
import {ModifyUserScreen} from "./modifyUser";
import {RouteProp} from "@react-navigation/native";
import {User} from "../../models/users";

export type UsersStackParamList = {
    UserList: undefined;
    ModifyUser: User | undefined;
};

const Stack = createStackNavigator<UsersStackParamList>();

export type UsersNav = StackNavigationProp<UsersStackParamList>;

export type ModifyUserRouteProp = RouteProp<UsersStackParamList, "ModifyUser">;

export const UsersStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="UserList"
            component={UserListScreen}
            options={({navigation}: {navigation: UsersNav}) => ({
                title: "用户",
                headerRight: () => (
                    <HeaderButton
                        name="plus"
                        onPress={() => navigation.navigate("ModifyUser")}
                        testID="userAddTopRight"
                    />
                ),
            })}
        />
        <Stack.Screen
            name="ModifyUser"
            component={ModifyUserScreen}
            options={({route}: {route: ModifyUserRouteProp}) => ({
                title: route.params === undefined ? "创建用户" : "修改用户信息",
            })}
        />
    </Stack.Navigator>
);
