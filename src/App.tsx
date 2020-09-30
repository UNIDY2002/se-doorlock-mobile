import React from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AuthFlow} from "./AuthFlow";
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

export const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <NavigationContainer
                theme={{
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        background: "white",
                    },
                }}>
                <AuthFlow />
            </NavigationContainer>
        </PersistGate>
    </Provider>
);
