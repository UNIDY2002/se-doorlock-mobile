import {renderAndLogin, sleep} from "../src/utils/testUtils";

test("devices", async () => {
    jest.setTimeout(30000);
    const root = await renderAndLogin();

    // Switch to devices
    const UsersTab = root.findByProps({name: "Users"});
    await sleep(600);
    UsersTab.props.navigation.navigate("Devices");
    await sleep(600);

    // Press plus button
    root.findByProps({testID: "deviceAddTopRight"}).props.onPress();
    await sleep(1000);
    root.findByProps({testID: "scanQrCamera"}).props.onBarCode("first");
    root.findByProps({testID: "scanQrCamera"}).props.onBarCode("second"); // See what will happen when scanned twice (which is very common in reality)
    await sleep(500);

    // Find a device and view detail
    root.findAllByProps({testID: "DeviceItemInList"})[0].props.onPress();
    await sleep(800);

    // Unbind a device
    root.findAllByProps({testID: "unbindDevice"})[0].props.onPress();
    await sleep(800);
});
