/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    FC,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useState,
} from "react";
import Snackbar from "react-native-snackbar";
import {FlatList, RefreshControl} from "react-native";

export function simpleRefreshList<T>(
    dataSource: (props: PropsWithChildren<any>) => Promise<T[]>,
    renderItem: (
        item: T,
        refresh: () => void,
        props: PropsWithChildren<any>,
    ) => ReactElement,
    keyExtractor: (item: T) => string,
): FC {
    return (props) => {
        const [data, setData] = useState<T[]>([]);
        const [refreshing, setRefreshing] = useState(false);

        const refresh = () => {
            setRefreshing(true);
            dataSource(props)
                .then(setData)
                .catch((e) => {
                    if (typeof e === "string" && e.includes("没有找到相关")) {
                        setData([]);
                    }
                    Snackbar.show({
                        text:
                            typeof e === "string" && e.length > 0
                                ? e
                                : "网络异常，请重试",
                        duration: Snackbar.LENGTH_SHORT,
                    });
                })
                .then(() => setRefreshing(false));
        };
        // @ts-ignore
        useEffect(refresh, [props.route?.params?.refreshTimestamp]);

        return (
            <FlatList
                style={{flex: 1}}
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                }
                renderItem={({item}) => renderItem(item, refresh, props)}
                keyExtractor={keyExtractor}
            />
        );
    };
}
