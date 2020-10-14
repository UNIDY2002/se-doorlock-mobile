import "react-native";
import React from "react";
import {App} from "../src/App";
import renderer from "react-test-renderer";
import {Button} from "react-native";
import {TextInput} from "react-native";
import {RectButton} from "react-native-gesture-handler";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("users", async () => {
    jest.setTimeout(30000);

    // Render the app
    const {root} = renderer.create(<App />);
    await sleep(1000);

    // Perform login
    root.findAllByType(TextInput)[0].props.onChangeText("super");
    root.findAllByType(TextInput)[1].props.onChangeText("123456");
    await sleep(800);
    root.findAllByType(Button)[0].props.onPress();
    await sleep(1500);

    // Perform add user
    root.findByProps({testID: "userAddTopRight"}).props.onPress();
    await sleep(800);
    root.findByProps({testID: "modifyUserDescription"}).props.onChangeText(
        "description",
    );
    await sleep(500);
    root.findByProps({testID: "modifyUserSubmit"}).props.onPress();
    await sleep(800);
    root.findByProps({testID: "modifyUserName"}).props.onChangeText("name");
    await sleep(500);
    root.findByProps({testID: "modifyUserSubmit"}).props.onPress();
    await sleep(1200);
    expect(root.findAllByProps({testID: "modifyUserSubmit"}).length).toEqual(0);
    await sleep(500);

    // Perform edit user
    root.findAllByProps({testID: "userItem"})[0].props.onPress();
    await sleep(500);
    expect(root.findByProps({testID: "modifyUserName"}).props.value).toEqual(
        "a",
    );
    await sleep(300);
    root.findByProps({testID: "modifyUserName"}).props.onChangeText("z");
    await sleep(500);
    root.findByProps({testID: "modifyUserSubmit"}).props.onPress();
    await sleep(1200);
    expect(root.findAllByProps({testID: "modifyUserSubmit"}).length).toEqual(0);
    await sleep(300);
    root.findAllByProps({testID: "userItem"})[0].props.onPress();
    await sleep(500);
    expect(root.findByProps({testID: "modifyUserName"}).props.value).toEqual(
        "z",
    );
    await sleep(500);

    // Delete a user
    expect(root.findAllByType(RectButton).length).toEqual(3);
    await sleep(200);
    const tempProps = root.findAllByType(RectButton)[0].props;
    tempProps.onPress();
    tempProps.onPress(); // Try what happens when user accidentally double-clicks
    await sleep(200);
    expect(root.findAllByType(RectButton).length).toEqual(2);
    await sleep(200);
});
