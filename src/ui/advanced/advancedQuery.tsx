import React from "react";
import {AdvancedNav} from "./advancedStack";
import {ScrollView} from "react-native";
import {TouchableItem} from "../../components/touchableItems";
import Icon from "react-native-vector-icons/FontAwesome";

export const AdvancedQueryScreen = ({
    navigation,
}: {
    navigation: AdvancedNav;
}) => (
    <ScrollView style={{padding: 10}}>
        <TouchableItem
            text="查询"
            onPress={() => navigation.navigate("AdvancedHistory", {query: {}})}
            icon={<Icon name="play" size={16} />}
            testID="enterAdvancedHistory"
        />
    </ScrollView>
);
