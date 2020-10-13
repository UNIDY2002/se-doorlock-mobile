import {GET_DOOR_USERS_URL} from "../constants/urls";
import {User} from "../models/users";
import {tokens} from "./tokens";

export const getDoorUsers = () =>
    fetch(GET_DOOR_USERS_URL, {
        headers: {Authorization: `Bearer ${tokens.accessToken}`},
    })
        .then((r) => r.json())
        .then((r: {name: string; notes: string}[]) =>
            r.map(({name, notes}) => ({name, description: notes} as User)),
        );
