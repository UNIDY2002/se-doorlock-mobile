import {Alert} from "react-native";

export const simpleAlert = (
    title: string,
    message: string | undefined,
    onConfirm: () => void,
) => {
    Alert.alert(
        title,
        message,
        [{text: "取消"}, {text: "确定", onPress: onConfirm}],
        {cancelable: true},
    );
};
