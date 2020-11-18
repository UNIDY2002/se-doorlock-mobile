import {authedFetch} from "./core";
import {GET_HISTORY_URL} from "../constants/urls";
import {ActivityDetail, History, Query} from "../models/history";
import {Activity} from "../redux/states/config";
import dayjs from "dayjs";
import {getDoorUsers} from "./users";
import {User} from "../models/users";

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
                device_description,
            }: {
                device_id: number;
                id: number;
                time: string;
                user_id: number;
                user_name: string;
                device_description: string;
            }) => ({
                deviceId: device_id,
                id,
                time,
                userId: user_id,
                userName: user_name,
                deviceDescription: device_description,
            }),
        ),
    );

export const getActivityDetail = async ({
    beginHour,
    beginMinute,
    endHour,
    endMinute,
    users,
}: Activity): Promise<ActivityDetail[]> => {
    const [filteredHistory, allUsers]: [History[], User[]] = await Promise.all([
        getHistory({
            begin: dayjs()
                .startOf("date")
                .add(beginHour, "hour")
                .add(beginMinute, "minute")
                .toDate()
                .valueOf(),
            end: dayjs()
                .startOf("date")
                .add(endHour, "hour")
                .add(endMinute, "minute")
                .toDate()
                .valueOf(),
        }),
        getDoorUsers(),
    ]);
    return allUsers
        .filter((it) => users.indexOf(it.id) !== -1)
        .map(({id, name}) => {
            const history = filteredHistory.find((it) => it.userId === id);
            return {
                userId: id,
                name,
                deviceId: history?.deviceId,
                time: history?.time,
            };
        });
};
