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

    // Press activities button
    root.findByProps({testID: "enterActivities"}).props.onPress();
    await sleep(500);

    // Create a new activity
    root.findByProps({testID: "addActivityHeaderRight"}).props.onPress();
    await sleep(500);
    // This should fail
    root.findByProps({testID: "submitNewActivity"}).props.onPress();
    await sleep(600);
    root.findByProps({testID: "addActivityUser-1"}).props.onPress();
    await sleep(500);
    root.findByProps({testID: "addActivityUser-1"}).props.onPress();
    root.findByProps({testID: "addActivityUser-0"}).props.onPress();
    root.findByProps({testID: "addActivityBeginHour"}).props.onChangeText("10");
    root.findByProps({testID: "addActivityBeginMinute"}).props.onChangeText(
        "40",
    );
    root.findByProps({testID: "addActivityEndHour"}).props.onChangeText("30");
    root.findByProps({testID: "submitNewActivity"}).props.onPress();
    await sleep(500);
    root.findByProps({testID: "addActivityEndHour"}).props.onChangeText("12");
    root.findByProps({testID: "addActivityEndMinute"}).props.onChangeText("4x");
    root.findByProps({testID: "submitNewActivity"}).props.onPress();
    await sleep(500);
    root.findByProps({testID: "addActivityEndMinute"}).props.onChangeText("15");
    root.findByProps({testID: "submitNewActivity"}).props.onPress();
    root.findByProps({testID: "submitNewActivity"}).props.onPress(); // See what happens if pressed twice
    await sleep(500);

    // Press a activity
    root.findAllByProps({testID: "activityItem"})[0].props.onPress();
    await sleep(500);

    // Now delete it
    root.findAllByProps({testID: "activitySwipeable"})[0].props.onPress();
    await sleep(1000);

    // Let's logout!
    root.findByProps({testID: "logout"}).props.onPress();
    await sleep(1000);
});
