import Icon from "react-native-vector-icons/FontAwesome";
import {TouchableOpacity} from "react-native";
import React from "react";

export const HeaderButton = ({
    name,
    onPress,
}: {
    name: string;
    onPress: () => any;
}) => (
    <TouchableOpacity
        style={{paddingHorizontal: 16, marginHorizontal: 4}}
        onPress={onPress}>
        <Icon name={name} size={24} color="tomato" />
    </TouchableOpacity>
);
