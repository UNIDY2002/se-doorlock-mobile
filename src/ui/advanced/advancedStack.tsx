import React from "react";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import {HomeScreen} from "./home";
import {CameraTempScreen} from "./cameraTemp";

export type AdvancedStackParamList = {
    Home: undefined;
    CameraTemp: undefined;
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
            name="CameraTemp"
            component={CameraTempScreen}
            options={{title: "相机"}}
        />
    </Stack.Navigator>
);
