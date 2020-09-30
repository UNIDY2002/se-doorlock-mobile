import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

jest.mock("react-native-reanimated", () => {
    const Reanimated = require("react-native-reanimated/mock");
    Reanimated.default.call = () => {};
    return Reanimated;
});

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);

jest.mock("redux-persist/lib/createPersistoid", () =>
    jest.fn(() => ({
        update: jest.fn(),
        flush: jest.fn(),
    })),
);
