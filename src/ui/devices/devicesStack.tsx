import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {DeviceListScreen} from "./deviceList";
import {DeviceScanScreen} from "./deviceScan";
import {HeaderButton} from "../../components/headerButtons";
import {HistoryScreen} from "../general/history";

export type DevicesStackParamList = {
    DeviceList: {refreshTimestamp: number} | undefined;
    DeviceScan: undefined;
    DeviceHistory: {deviceId: number};
};

const Stack = createStackNavigator<DevicesStackParamList>();

export type DevicesNav = StackNavigationProp<DevicesStackParamList>;

export const DevicesStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="DeviceList"
            component={DeviceListScreen}
            options={({navigation}: {navigation: DevicesNav}) => ({
                title: "设备",
                headerRight: () => (
                    <HeaderButton
                        name="plus"
                        onPress={() => navigation.navigate("DeviceScan")}
                        testID="deviceAddTopRight"
                    />
                ),
            })}
        />
        <Stack.Screen
            name="DeviceScan"
            component={DeviceScanScreen}
            options={{title: "扫码绑定"}}
        />
        <Stack.Screen
            name="DeviceHistory"
            component={HistoryScreen}
            options={{title: "出入记录"}}
        />
    </Stack.Navigator>
);
