import {LOGIN_URL, POST_FILE_URL} from "../constants/urls";
import {tokens} from "./tokens";

export const login = (username: string, password: string) =>
    fetch(LOGIN_URL, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
    })
        .then((r) => {
            if (r.status !== 200) {
                throw new Error("Login failed!");
            }
            return r.json();
        })
        .then(
            ({access_token}: {access_token: string}) =>
                (tokens.accessToken = access_token),
        );

// eslint-disable-next-line no-undef
export const authedFetch = (input: RequestInfo, init?: RequestInit) =>
    fetch(
        input,
        init === undefined
            ? {headers: {Authorization: `Bearer ${tokens.accessToken}`}}
            : {
                  ...init,
                  headers: {
                      ...init.headers,
                      Authorization: `Bearer ${tokens.accessToken}`,
                  },
              },
    )
        .then((r) => r.json())
        .then((r) => {
            if (typeof r.error_code === "number" && r.error_code !== 0) {
                throw r.msg;
            }
            return r;
        });

export const postFile = (type: string, uri: string, name: string) => {
    const body = new FormData();
    body.append("file", {type, uri, name});
    return authedFetch(POST_FILE_URL, {
        method: "POST",
        body,
        headers: {"Content-Type": "multipart/form-data"},
    }).then((r: {path: string; url: string}[]) =>
        r.map(({path, url}) => ({
            uri: url,
            src: path,
            headers: {Authorization: `Bearer ${tokens.accessToken}`},
        })),
    );
};
