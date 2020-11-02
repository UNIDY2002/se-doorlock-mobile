import {Auth} from "./states/auth";
import {combineReducers, createStore} from "redux";
import {auth} from "./reducers/auth";
import AsyncStorage from "@react-native-community/async-storage";
import {persistStore, persistReducer} from "redux-persist";
import createTransform from "redux-persist/es/createTransform";
import {Config} from "./states/config";
import {config} from "./reducers/config";

export interface State {
    auth: Auth;
    config: Config;
}

const authTransform = createTransform(() => false, undefined, {
    whitelist: ["loggedIn"],
});

const rootReducer = combineReducers({
    auth: persistReducer(
        {
            storage: AsyncStorage,
            key: "auth",
            transforms: [authTransform],
        },
        auth,
    ),
    config,
});

const persistConfig = {
    version: 1,
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth", "config"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
