import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        padding: 5,
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "40%",
    },
    textInputIconContainer: {
        width: 16,
        alignItems: "flex-end",
    },
    loginButtonStyle: {
        height: 35,
        width: 100,
        backgroundColor: "tomato",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    loginButtonTextStyle: {
        color: "white",
        fontWeight: "bold",
    },
});
