import React from "react";
import {Button} from "react-native";
import {LoginNav} from "../../AuthFlow";
import {connect} from "react-redux";
import {DO_LOGIN} from "../../redux/constants";

const LoginUI = ({
    navigation,
    login,
}: {
    navigation: LoginNav;
    login: (username: string, password: string) => void;
}) => {
    return (
        <>
            <Button title="登录" onPress={() => login("", "")} />
            <Button
                title="注册"
                onPress={() => navigation.navigate("Register")}
            />
        </>
    );
};

export const LoginScreen = connect(undefined, (dispatch) => ({
    login(username: string, password: string) {
        dispatch({type: DO_LOGIN, payload: {username, password}});
    },
}))(LoginUI);
