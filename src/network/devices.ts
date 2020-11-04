import {
    BIND_DOOR_ADMIN_URL,
    GET_DOOR_DEVICES_URL,
    UNBIND_DOOR_ADMIN_URL,
} from "../constants/urls";
import {Device} from "../models/devices";
import {authedFetch} from "./core";

export const getDoorDevices = () =>
    authedFetch(
        GET_DOOR_DEVICES_URL,
    ).then((r: {id: number; description: string}[]) =>
        r.map(({id, description}) => ({id, description} as Device)),
    );

export const bindDoorAdmin = (uuid: string) =>
    authedFetch(`${BIND_DOOR_ADMIN_URL}?uuid=${encodeURIComponent(uuid)}`);

export const unbindDoorAdmin = (deviceId: number) =>
    authedFetch(`${UNBIND_DOOR_ADMIN_URL}?device_id=${deviceId}`);
