import {Auth} from "./states/auth";
import {AnyAction, combineReducers, createStore} from "redux";
import {auth} from "./reducers/auth";
import AsyncStorage from "@react-native-community/async-storage";
import {persistStore, persistReducer} from "redux-persist";
import createTransform from "redux-persist/es/createTransform";

export interface State {
    auth: Auth;
}

const authTransform = createTransform(() => false, undefined, {
    whitelist: ["loggedIn"],
});

const rootReducer = combineReducers<typeof auth, AnyAction>({
    auth: persistReducer(
        {
            storage: AsyncStorage,
            key: "auth",
            transforms: [authTransform],
        },
        auth,
    ),
});

const persistConfig = {
    version: 1,
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
