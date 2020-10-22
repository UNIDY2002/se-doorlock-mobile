import "react-native";
import React from "react";
import {App} from "../src/App";
import renderer from "react-test-renderer";
import {Button} from "react-native";
import {TextInput} from "react-native";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("camera", async () => {
    jest.setTimeout(30000);

    // Render the app
    const {root} = renderer.create(<App />);
    await sleep(1000);

    // Perform login
    root.findAllByType(TextInput)[0].props.onChangeText("super");
    root.findAllByType(TextInput)[1].props.onChangeText("123456");
    await sleep(800);
    root.findAllByType(Button)[0].props.onPress();
    await sleep(1200);

    // Create a user and take photo
    root.findByProps({testID: "userAddTopRight"}).props.onPress();
    await sleep(800);
    root.findByProps({testID: "modifyUserCameraButton"}).props.onPress();
    await sleep(2000);
    root.findByProps({testID: "CameraForTest"}).props.onPress();
    await sleep(2000);
    root.findByProps({testID: "modifyUserSubmit"}).props.onPress();
    await sleep(1200);

    // Go to one user and take photo
    root.findAllByProps({testID: "userItem"})[0].props.onPress();
    await sleep(500);
    root.findByProps({testID: "modifyUserCameraButton"}).props.onPress();
    await sleep(2000);
    root.findByProps({testID: "CameraForTest"}).props.onPress();
    await sleep(2000);

    // Delete the photo taken
    root.findAllByProps({testID: "userPhotoTouchable"})[0].props.onPress();
    await sleep(1000);
});
