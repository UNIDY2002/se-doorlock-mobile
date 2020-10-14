import "react-native";
import React from "react";
import {App} from "../src/App";
import renderer from "react-test-renderer";
import {Button} from "react-native";
import {TextInput} from "react-native";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("routing", async () => {
    jest.setTimeout(30000);

    // Render the app
    const {root} = renderer.create(<App />);
    await sleep(1000);

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

    // Press login and fail
    root.findAllByType(Button)[0].props.onPress();
    await sleep(800);
    expect(root.findAllByProps({name: "Users"}).length).toEqual(0);

    // Press login and succeed
    root.findByProps({testID: "usernameInput"}).props.onChangeText("super");
    root.findByProps({testID: "passwordInput"}).props.onChangeText("123456");
    await sleep(800);
    root.findAllByType(Button)[0].props.onPress();
    await sleep(1500);

    // Switch between tabs
    const UsersTab = root.findByProps({name: "Users"});
    await sleep(800);
    UsersTab.props.navigation.navigate("Devices");
    await sleep(2000);
    UsersTab.props.navigation.navigate("Advanced");
    await sleep(2000);
});
