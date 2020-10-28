import renderer from "react-test-renderer";
import {App} from "../src/App";
import {Button, TextInput} from "react-native";
import React from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("devices", async () => {
    jest.setTimeout(30000);

    // Render the app
    const {root} = renderer.create(<App />);
    await sleep(1000);

    // Perform login
    root.findAllByType(TextInput)[0].props.onChangeText("super");
    root.findAllByType(TextInput)[1].props.onChangeText("123456");
    await sleep(600);
    root.findAllByType(Button)[0].props.onPress();
    await sleep(600);

    // Switch to advanced
    const UsersTab = root.findByProps({name: "Users"});
    await sleep(600);
    UsersTab.props.navigation.navigate("Advanced");
    await sleep(600);

    // Press advanced query button
    root.findByProps({testID: "enterAdvancedQuery"}).props.onPress();
    await sleep(500);
    root.findByProps({testID: "enterAdvancedHistory"}).props.onPress();
    await sleep(500);
});
