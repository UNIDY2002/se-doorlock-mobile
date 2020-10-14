import {GET_DOOR_DEVICES_URL} from "../constants/urls";
import {Device} from "../models/devices";
import {authedFetch} from "./core";

export const getDoorDevices = () =>
    authedFetch(
        GET_DOOR_DEVICES_URL,
    ).then((r: {id: number; description: string}[]) =>
        r.map(({id, description}) => ({id, description} as Device)),
    );
