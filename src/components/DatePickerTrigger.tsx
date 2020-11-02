import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    Button,
    Platform,
} from "react-native";
import React, {useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

export const DatePickerTrigger = ({
    date,
    onChange,
    text,
    flex,
}: {
    date: Date;
    onChange: (newDate: Date) => void;
    text: string;
    flex?: number;
}) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <TouchableOpacity
                style={{
                    flex: flex ?? 1,
                    padding: 6,
                }}
                onPress={() => setVisible(true)}>
                <Text
                    style={{
                        fontSize: 16,
                    }}>
                    {dayjs(date).format("YYYY-MM-DD")}
                </Text>
            </TouchableOpacity>
            {visible && Platform.OS === "android" && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    onChange={(_, selectedDate) => {
                        setVisible(false);
                        if (selectedDate !== undefined) {
                            onChange(selectedDate);
                        }
                    }}
                />
            )}
            {visible && Platform.OS === "ios" && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {}}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                        }}>
                        <View
                            style={{
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                shadowColor: "gray",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowRadius: 3,
                                shadowOpacity: 0.8,
                                paddingVertical: 4,
                            }}>
                            <Text style={{fontSize: 16}}>{text}</Text>
                            <Button
                                title="确认"
                                onPress={() => {
                                    setVisible(false);
                                }}
                            />
                        </View>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            onChange={(_, selectedDate) => {
                                if (selectedDate !== undefined) {
                                    onChange(selectedDate);
                                }
                            }}
                            style={{
                                width: "100%",
                                backgroundColor: "white",
                            }}
                        />
                    </View>
                    <View style={{height: 15, backgroundColor: "white"}} />
                </Modal>
            )}
        </>
    );
};
