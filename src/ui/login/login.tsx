import React from "react";
import {Button} from "react-native";
import {LoginNav} from "../../AuthFlow";

export const LoginScreen = ({navigation}: {navigation: LoginNav}) => {
    return (
        <>
            <Button title="登录" onPress={() => {}} />
            <Button
                title="注册"
                onPress={() => navigation.navigate("Register")}
            />
        </>
    );
};
