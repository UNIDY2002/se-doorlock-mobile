import {authedFetch} from "./core";
import {GET_HISTORY_URL} from "../constants/urls";
import {History} from "../models/history";

export const getUserHistory = (userId: number): Promise<History[]> =>
    authedFetch(`${GET_HISTORY_URL}?user_id=${userId}`).then((r) =>
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
