import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

import {GET_DOOR_DEVICES_URL, GET_DOOR_USERS_URL, LOGIN_URL} from "./src/constants/urls";

require("jest-fetch-mock").enableMocks();

fetchMock.mockIf(LOGIN_URL, (req) => {
    const {username, password} = JSON.parse(String(req.body));
    return Promise.resolve({
        status: (username === "super" && password === "123456") ? 200 : 400,
        body: JSON.stringify({access_token: "access_token"}),
        headers: {"Content-Type": "application/json"},
    });
});

fetchMock.mockIf(GET_DOOR_USERS_URL, () => {
    return Promise.resolve({
        body: JSON.stringify([{name: "a", notes: "x"}, {name: "b", notes: "y"}]),
        headers: {"Content-Type": "application/json"},
    })
})

fetchMock.mockIf(GET_DOOR_DEVICES_URL, () => {
    return Promise.resolve({
        body: JSON.stringify([{id: 1, description: "p"}, {id: 2, description: "q"}]),
        headers: {"Content-Type": "application/json"},
    })
})

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
