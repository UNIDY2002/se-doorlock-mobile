import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

require("./.mockbackend.js");

global.console = {
    log: console.log,
    error: jest.fn((message) => {
        try {
            if (message.indexOf("An update to CardContainer inside a test was not wrapped in act(...).") === -1) {
                console.error(message);
            }
        } catch (e) {}
    }),
    warn: console.warn,
    info: console.info,
    debug: console.debug,
};

function FormDataMock() {
    this.append = jest.fn();
}

global.FormData = FormDataMock

jest.mock("src/components/camera");

jest.mock("src/components/DatePickerTrigger");

jest.mock("src/utils/alerts", () => ({
    simpleAlert: (title, message, onConfirm) => {
        onConfirm();
    }
}))

jest.mock("react-native-reanimated", () => {
    const Reanimated = require("react-native-reanimated/mock");
    Reanimated.default.call = () => {};
    return Reanimated;
});

jest.mock("react-native-snackbar", () => ({
    show: () => {},
    LENGTH_LONG: 0,
    LENGTH_SHORT: -1,
    LENGTH_INDEFINITE: -2,
}));

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);

jest.mock("redux-persist/lib/createPersistoid", () =>
    jest.fn(() => ({
        update: jest.fn(),
        flush: jest.fn(),
    })),
);
