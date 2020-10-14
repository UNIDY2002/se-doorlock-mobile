import "react-native-gesture-handler/jestSetup";
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

import {GET_DOOR_DEVICES_URL, GET_DOOR_USERS_URL, LOGIN_URL} from "./src/constants/urls";
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

fetchMock.mockIf(/^.*$/, (req) => {
    switch (req.url) {
        case LOGIN_URL:
            const {username, password} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "super" && password === "123456") ? 200 : 400,
                body: JSON.stringify({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"},
            });
        case GET_DOOR_USERS_URL:
            return Promise.resolve({
                body: JSON.stringify(req.method === "GET"
                    ? [{name: "a", notes: "x"}, {name: "b", notes: "y"}]
                    : {error_code: JSON.parse(String(req.body)).name === "" ? -1 : 0, msg: ""}),
                headers: {"Content-Type": "application/json"},
            });
        case GET_DOOR_DEVICES_URL:
            return Promise.resolve({
                body: JSON.stringify([{id: 1, description: "p"}, {id: 2, description: "q"}]),
                headers: {"Content-Type": "application/json"},
            })
    }
});

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
