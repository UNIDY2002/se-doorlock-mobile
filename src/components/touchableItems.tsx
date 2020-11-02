import React from "react";
import {
    GestureResponderEvent,
    Platform,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const TouchableItem = ({
    text,
    onPress,
    icon,
}: {
    text: string;
    onPress: (event: GestureResponderEvent) => void;
    icon: any;
    testID?: string;
}) => {
    const content = (
        <View
            style={{
                padding: 8,
                paddingRight: 16,
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                {icon}
                <Text style={{fontSize: 17, marginHorizontal: 10}}>{text}</Text>
            </View>
            <Icon name="angle-right" size={24} color="lightgrey" />
        </View>
    );
    return Platform.OS === "ios" ? (
        <TouchableHighlight underlayColor="#0002" onPress={onPress}>
            {content}
        </TouchableHighlight>
    ) : (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#0002", false)}
            onPress={onPress}>
            {content}
        </TouchableNativeFeedback>
    );
};

export const SelectorItem = <T,>({
    item,
    value,
    setValue,
}: {
    item: T;
    value: T;
    setValue: (newValue: T) => void;
}) => (
    <TouchableOpacity
        onPress={() => setValue(item)}
        style={{padding: 5}}
        testID={`selectItem${item}`}>
        <Text style={{color: item === value ? "tomato" : "black"}}>{item}</Text>
    </TouchableOpacity>
);

export const Separator = () => <View style={{height: 10}} />;
