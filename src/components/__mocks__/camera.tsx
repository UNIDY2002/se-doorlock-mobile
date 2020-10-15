import {Button} from "react-native";
import React from "react";

export const Camera = ({onPress}: {onPress?: (uri: string) => void}) => (
    <Button
        title="dummy"
        onPress={() => onPress && onPress("")}
        testID="CameraForTest"
    />
);
