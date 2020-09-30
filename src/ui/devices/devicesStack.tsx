import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {DeviceListScreen} from "./deviceList";

export type DevicesStackParamList = {
    DeviceList: undefined;
};

const Stack = createStackNavigator<DevicesStackParamList>();

export type DevicesNav = StackNavigationProp<DevicesStackParamList>;

export const DevicesStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="DeviceList"
            component={DeviceListScreen}
            options={{title: "设备"}}
        />
    </Stack.Navigator>
);
