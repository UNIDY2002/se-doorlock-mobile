import {GET_DOOR_USERS_URL} from "../constants/urls";
import {User} from "../models/users";
import {authedFetch} from "./core";

export const getDoorUsers = () =>
    authedFetch(
        GET_DOOR_USERS_URL,
    ).then((r: {id: number; name: string; notes: string}[]) =>
        r.map(({id, name, notes}) => ({id, name, description: notes} as User)),
    );

export const getDoorUser = (uid: number) =>
    authedFetch(`${GET_DOOR_USERS_URL}/${uid}`).then(
        ({id, name, notes}: {id: number; name: string; notes: string}) =>
            ({id, name, description: notes} as User),
    );

export const createDoorUser = (name: string, description: string) =>
    authedFetch(GET_DOOR_USERS_URL, {
        method: "POST",
        body: JSON.stringify({name, notes: description}),
        headers: {"Content-Type": "application/json"},
    });

export const updateDoorUser = ({id, name, description}: User) =>
    authedFetch(`${GET_DOOR_USERS_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({id, name, notes: description}),
        headers: {"Content-Type": "application/json"},
    });
