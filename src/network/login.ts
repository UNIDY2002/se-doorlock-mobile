import {LOGIN_URL} from "../constants/urls";
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
