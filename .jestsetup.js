import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

import {LOGIN_URL} from "./src/constants/urls";

require("jest-fetch-mock").enableMocks();

fetchMock.mockIf(LOGIN_URL, (req) => {
    const {username, password} = JSON.parse(String(req.body));
    return Promise.resolve({
        status: (username === "super" && password === "123456") ? 200 : 400
    });
});

jest.mock("react-native-reanimated", () => {
    const Reanimated = require("react-native-reanimated/mock");
    Reanimated.default.call = () => {};
    return Reanimated;
});

jest.mock("react-native-snackbar", () => ({
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
