import {renderAndLogin, sleep} from "../src/utils/testUtils";

test("camera", async () => {
    jest.setTimeout(30000);
    const root = await renderAndLogin();

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
    await sleep(2000);
    root.findByProps({testID: "modifyUserCameraButton"}).props.onPress();
    await sleep(2000);
    root.findByProps({testID: "CameraForTest"}).props.onPress();
    await sleep(4000);

    // Delete the photo taken
    root.findAllByProps({testID: "userPhotoTouchable"})[0].props.onPress();
    await sleep(1000);
});
