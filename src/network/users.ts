import {ASSETS_URL, GET_DOOR_USERS_URL} from "../constants/urls";
import {AuthConfig, Gender, User} from "../models/users";
import {authedFetch} from "./core";
import {tokens} from "./tokens";

export const getDoorUsers = () =>
    authedFetch(
        GET_DOOR_USERS_URL,
    ).then((r: {id: number; name: string; notes: string; gender: string}[]) =>
        r.map(
            ({id, name, notes, gender}) =>
                ({id, name, description: notes, gender} as User),
        ),
    );

export const getDoorUser = (uid: number): Promise<[User, AuthConfig[]]> =>
    authedFetch(`${GET_DOOR_USERS_URL}/${uid}`).then(
        ({
            id,
            name,
            notes,
            gender,
            images,
            useDevices,
        }: {
            id: number;
            name: string;
            notes: string;
            gender: Gender;
            images: {src: string}[];
            useDevices: number[];
        }) => [
            {id, name, description: notes, gender, useDevices},
            images.map(({src}) => ({
                src,
                uri: `${ASSETS_URL}/${src}`,
                headers: {Authorization: `Bearer ${tokens.accessToken}`},
            })),
        ],
    );

export const createDoorUser = (
    name: string,
    description: string,
    gender: Gender,
    useDevices: number[],
    images: string[],
) =>
    authedFetch(GET_DOOR_USERS_URL, {
        method: "POST",
        body: JSON.stringify({
            name,
            notes: description,
            gender,
            images: images.map((src) => ({src})),
            useDevices,
        }),
        headers: {"Content-Type": "application/json"},
    });

export const updateDoorUser = (
    {id, name, description, gender, useDevices}: User,
    images: string[],
) =>
    authedFetch(`${GET_DOOR_USERS_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            name,
            notes: description,
            gender,
            useDevices,
            images: images.map((src) => ({src})),
        }),
        headers: {"Content-Type": "application/json"},
    });

export const deleteDoorUser = (id: number) =>
    authedFetch(`${GET_DOOR_USERS_URL}/${id}`, {method: "DELETE"});
