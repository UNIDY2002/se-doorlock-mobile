import React, {useEffect, useState} from "react";
import {Button, TextInput, View} from "react-native";
import {simpleAlert} from "../../utils/alerts";
import {connect} from "react-redux";
import {DO_LOGIN} from "../../redux/constants";
import styles from "../../styles/login";
import Icon from "react-native-vector-icons/FontAwesome";
import {State} from "../../redux/store";
import {Auth} from "../../redux/states/auth";
import {login} from "../../network/core";
import Snackbar from "react-native-snackbar";

const LoginUI = ({
    doLogin,
    auth,
}: {
    doLogin: (username: string, password: string) => void;
    auth: Auth;
}) => {
    const [username, setUsername] = useState(auth.username);
    const [password, setPassword] = useState(auth.password);

    const loginSuite = () => {
        login(username, password)
            .then(() => doLogin(username, password))
            .catch(() =>
                Snackbar.show({
                    text: "登录失败，请重试。",
                    duration: Snackbar.LENGTH_SHORT,
                }),
            );
    };

    useEffect(() => {
        if (username !== "" && password !== "") {
            loginSuite();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <View style={styles.textInputIconContainer}>
                    <Icon name="user" size={14} />
                </View>
                <TextInput
                    testID="usernameInput"
                    style={styles.textInput}
                    defaultValue={username}
                    onChangeText={setUsername}
                    placeholder="用户名"
                />
            </View>
            <View style={styles.textInputContainer}>
                <View style={styles.textInputIconContainer}>
                    <Icon name="key" size={14} />
                </View>
                <TextInput
                    testID="passwordInput"
                    style={styles.textInput}
                    defaultValue={password}
                    onChangeText={setPassword}
                    placeholder="密码"
                    secureTextEntry
                />
            </View>
            <Button
                title="登录"
                disabled={username.length === 0 || password.length === 0}
                onPress={loginSuite}
            />
            <Button
                title="注册"
                onPress={() =>
                    simpleAlert("请联系系统管理员分配账户", undefined, () => {})
                }
            />
        </View>
    );
};

export const LoginScreen = connect(
    (state: State) => ({auth: state.auth}),
    (dispatch) => ({
        doLogin(username: string, password: string) {
            dispatch({type: DO_LOGIN, payload: {username, password}});
        },
    }),
)(LoginUI);
