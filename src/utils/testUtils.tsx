import renderer from "react-test-renderer";
import {App} from "../App";
import {TextInput} from "react-native";
import React from "react";

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const renderAndLogin = async () => {
    const {root} = renderer.create(<App />);
    await sleep(1000);

    root.findAllByType(TextInput)[0].props.onChangeText("super");
    root.findAllByType(TextInput)[1].props.onChangeText("123456");
    await sleep(800);
    root.findByProps({testID: "loginTouchable"}).props.onPress();
    await sleep(1200);

    return root;
};
