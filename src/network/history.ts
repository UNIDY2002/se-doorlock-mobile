import {authedFetch} from "./core";
import {GET_HISTORY_URL} from "../constants/urls";
import {History, Query} from "../models/history";

const parseQueryString = (query: Query) => {
    const queryObject = {};
    if ("userId" in query && query.userId !== undefined) {
        // @ts-ignore
        queryObject.user_id = query.userId;
    }
    if ("deviceId" in query && query.deviceId !== undefined) {
        // @ts-ignore
        queryObject.device_id = query.deviceId;
    }
    if ("name" in query && query.name) {
        // @ts-ignore
        queryObject.name = query.name;
    }
    if ("gender" in query && query.gender) {
        // @ts-ignore
        queryObject.gender = query.gender;
    }
    if ("begin" in query && query.begin) {
        // @ts-ignore
        queryObject.begin = query.begin;
    }
    if ("end" in query && query.end) {
        // @ts-ignore
        queryObject.end = query.end;
    }
    return Object.keys(queryObject)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                    // @ts-ignore
                    queryObject[key],
                )}`,
        )
        .join("&");
};

export const getHistory = (query: Query): Promise<History[]> =>
    authedFetch(`${GET_HISTORY_URL}?${parseQueryString(query)}`).then((r) =>
        r.map(
            ({
                device_id,
                id,
                time,
                user_id,
                user_name,
            }: {
                device_id: number;
                id: number;
                time: string;
                user_id: number;
                user_name: string;
            }) => ({
                deviceId: device_id,
                id,
                time,
                userId: user_id,
                userName: user_name,
            }),
        ),
    );
