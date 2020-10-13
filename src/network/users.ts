import {GET_DOOR_USERS_URL} from "../constants/urls";
import {User} from "../models/users";
import {authedFetch} from "./core";

export const getDoorUsers = () =>
    authedFetch(GET_DOOR_USERS_URL).then((r: {name: string; notes: string}[]) =>
        r.map(({name, notes}) => ({name, description: notes} as User)),
    );
