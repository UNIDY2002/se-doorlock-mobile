import "react-native";
import React from "react";
import {App} from "../src/App";
import renderer from "react-test-renderer";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("routing", async () => {
    jest.setTimeout(30000);

    // Render the app
    const {root} = renderer.create(<App />);
    await sleep(1000);

    // Press register
    root.findByProps({testID: "registerTouchable"}).props.onPress();
    await sleep(800);

    // Press login and fail
    root.findByProps({testID: "loginTouchable"}).props.onPress();
    await sleep(800);
    expect(root.findAllByProps({name: "Users"}).length).toEqual(0);

    // Press login and succeed
    root.findByProps({testID: "usernameInput"}).props.onChangeText("super");
    root.findByProps({testID: "passwordInput"}).props.onChangeText("123456");
    await sleep(800);
    root.findByProps({testID: "loginTouchable"}).props.onPress();
    await sleep(1500);

    // Switch between tabs
    const UsersTab = root.findByProps({name: "Users"});
    await sleep(800);
    UsersTab.props.navigation.navigate("Devices");
    await sleep(2000);
    UsersTab.props.navigation.navigate("Advanced");
    await sleep(2000);
});
