import React from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {AuthFlow} from "./AuthFlow";

export const App = () => (
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
);
