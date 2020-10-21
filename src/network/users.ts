import {
    ASSETS_URL,
    GET_DOOR_USERS_URL,
    USER_PHOTO_URL,
} from "../constants/urls";
import {AuthConfig, Gender, User} from "../models/users";
import {authedFetch} from "./core";
import {tokens} from "./tokens";

export const getDoorUsers = () =>
    authedFetch(
        GET_DOOR_USERS_URL,
    ).then((r: {id: number; name: string; notes: string}[]) =>
        r.map(({id, name, notes}) => ({id, name, description: notes} as User)),
    );

export const getDoorUser = (uid: number): Promise<[User, AuthConfig[]]> =>
    authedFetch(`${GET_DOOR_USERS_URL}/${uid}`).then(
        ({
            id,
            name,
            notes,
            gender,
            images,
        }: {
            id: number;
            name: string;
            notes: string;
            gender: Gender;
            images: {src: string}[];
        }) => [
            {id, name, description: notes, gender},
            images.map(({src}) => ({
                uri: `${ASSETS_URL}/${src}`,
                headers: {Authorization: `Bearer ${tokens.accessToken}`},
            })),
        ],
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

export const deleteDoorUser = (id: number) =>
    authedFetch(`${GET_DOOR_USERS_URL}/${id}`, {method: "DELETE"});

export const addDoorUserPhotos = (id: number, uri: string) => {
    const body = new FormData();
    body.append("file", {
        type: "image/jpeg",
        uri,
        name: "photo.jpg",
    });
    return authedFetch(`${USER_PHOTO_URL}/${id}`, {
        method: "POST",
        body,
        headers: {"Content-Type": "multipart/form-data"},
    });
};

export const getDoorUserPhotos = (id: number) =>
    authedFetch(`${USER_PHOTO_URL}/${id}`).then((r: string[]) =>
        r.map((it) => ({
            uri: `${ASSETS_URL}/${it}`,
            headers: {Authorization: `Bearer ${tokens.accessToken}`},
        })),
    );
