import React from "react";
import {AdvancedNav} from "./advancedStack";
import {Button} from "react-native";

export const HomeScreen = ({navigation}: {navigation: AdvancedNav}) => (
    <Button title="相机" onPress={() => navigation.navigate("CameraTemp")} />
);
