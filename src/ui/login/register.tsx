import React from "react";
import {Button, TextInput, View} from "react-native";
import {LoginNav} from "../../AuthFlow";
import styles from "../../styles/login";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import {DO_LOGIN} from "../../redux/constants";

export const RegisterUI = ({
    navigation,
    login,
}: {
    navigation: LoginNav;
    login: (username: string, password: string) => void;
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <View style={styles.textInputIconContainer}>
                    <Icon name="user" size={14} />
                </View>
                <TextInput style={styles.textInput} placeholder="用户名" />
            </View>
            <View style={styles.textInputContainer}>
                <View style={styles.textInputIconContainer}>
                    <Icon name="key" size={14} />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="密码"
                    secureTextEntry
                />
            </View>
            <Button title="注册" onPress={() => login("", "")} />
            <Button title="返回登录" onPress={() => navigation.pop()} />
        </View>
    );
};

export const RegisterScreen = connect(undefined, (dispatch) => ({
    login(username: string, password: string) {
        dispatch({type: DO_LOGIN, payload: {username, password}});
    },
}))(RegisterUI);
