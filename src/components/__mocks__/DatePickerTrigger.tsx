import {Text} from "react-native";
import React from "react";
import dayjs from "dayjs";

export const DatePickerTrigger = ({
    date,
}: {
    date: Date;
    onChange: (newDate: Date) => void;
    text: string;
    flex?: number;
}) => {
    return (
        <Text
            style={{
                fontSize: 16,
            }}>
            {dayjs(date).format("YYYY-MM-DD")}
        </Text>
    );
};
