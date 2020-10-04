import "react-native";
import React from "react";
import {App} from "../src/App";
import renderer, {act} from "react-test-renderer";
import {Button} from "react-native";
import {TextInput} from "react-native";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("routing", async () => {
    // Render the app
    const {root} = renderer.create(<App />);
    await act(async () => {});

    // Press register
    root.findAllByType(TextInput)[0].props.onChangeText("username");
    root.findAllByType(TextInput)[1].props.onChangeText("password");
    root.findAllByType(Button)[1].props.onPress();
    await sleep(800);
    expect(root.findAllByType(Button)[2].props.title).toEqual("注册");
    expect(root.findAllByType(Button)[3].props.title).toEqual("返回登录");
    expect(
        root.findByProps({testID: "register-username"}).props.defaultValue,
    ).toEqual("username");

    // Press return to login
    root.findAllByType(Button)[3].props.onPress();
    await sleep(800);
    expect(root.findAllByType(Button).length).toEqual(2);
    expect(root.findAllByType(Button)[0].props.title).toEqual("登录");
    expect(root.findAllByType(Button)[1].props.title).toEqual("注册");

    // Press login
    root.findAllByType(Button)[0].props.onPress();
    await sleep(800);

    // Switch between tabs
    const UsersTab = root.findByProps({name: "Users"});
    UsersTab.props.navigation.navigate("Devices");
    UsersTab.props.navigation.navigate("Advanced");
    await sleep(800);
});
