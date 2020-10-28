import {authedFetch} from "./core";
import {GET_HISTORY_URL} from "../constants/urls";
import {History, Query} from "../models/history";

const parseQueryString = (query: Query) => {
    const queryObject = {};
    if ("userId" in query) {
        // @ts-ignore
        queryObject.user_id = query.userId;
    }
    if ("deviceId" in query) {
        // @ts-ignore
        queryObject.device_id = query.userId;
    }
    if ("name" in query) {
        // @ts-ignore
        queryObject.name = query.name;
    }
    if ("gender" in query) {
        // @ts-ignore
        queryObject.gender = query.gender;
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
