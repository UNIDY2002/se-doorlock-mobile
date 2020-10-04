import React, {useState} from "react";
import {Button, TextInput, View} from "react-native";
import {LoginNav} from "../../AuthFlow";
import {connect} from "react-redux";
import {DO_LOGIN} from "../../redux/constants";
import styles from "../../styles/login";
import Icon from "react-native-vector-icons/FontAwesome";
import {State} from "../../redux/store";
import {Auth} from "../../redux/states/auth";

const LoginUI = ({
    navigation,
    login,
    auth,
}: {
    navigation: LoginNav;
    login: (username: string, password: string) => void;
    auth: Auth;
}) => {
    const [username, setUsername] = useState(auth.username);
    const [password, setPassword] = useState(auth.password);
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <View style={styles.textInputIconContainer}>
                    <Icon name="user" size={14} />
                </View>
                <TextInput
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
                onPress={() => login(username, password)}
            />
            <Button
                title="注册"
                onPress={() => navigation.navigate("Register", {username})}
            />
        </View>
    );
};

export const LoginScreen = connect(
    (state: State) => ({auth: state.auth}),
    (dispatch) => ({
        login(username: string, password: string) {
            dispatch({type: DO_LOGIN, payload: {username, password}});
        },
    }),
)(LoginUI);
