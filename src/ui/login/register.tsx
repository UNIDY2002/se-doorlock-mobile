import React from "react";
import {Button} from "react-native";
import {LoginNav} from "../../AuthFlow";

export const RegisterScreen = ({navigation}: {navigation: LoginNav}) => (
    <Button title="返回登录" onPress={() => navigation.pop()} />
);
