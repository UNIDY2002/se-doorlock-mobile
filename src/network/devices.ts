import {GET_DOOR_DEVICES_URL} from "../constants/urls";
import {tokens} from "./tokens";
import {Device} from "../models/users";

export const getDoorDevices = () =>
    fetch(GET_DOOR_DEVICES_URL, {
        headers: {Authorization: `Bearer ${tokens.accessToken}`},
    })
        .then((r) => r.json())
        .then((r) =>
            r.map(
                ({id, description}: {id: number; description: string}) =>
                    ({id, description} as Device),
            ),
        );
