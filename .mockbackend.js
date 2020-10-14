import {GET_DOOR_DEVICES_URL, GET_DOOR_USERS_URL, LOGIN_URL} from "./src/constants/urls";
import {enableFetchMocks} from 'jest-fetch-mock'

enableFetchMocks()

const users = [{id: 0, name: "a", notes: "x"}, {id: 1, name: "b", notes: "y"}];
const devices = [{id: 1, description: "p"}, {id: 2, description: "q"}];

fetchMock.mockIf(/^.*$/, (req) => {
    switch (req.url) {
        case LOGIN_URL:
            const {username, password} = JSON.parse(String(req.body));
            return Promise.resolve({
                status: (username === "super" && password === "123456") ? 200 : 400,
                body: JSON.stringify({access_token: "access_token"}),
                headers: {"Content-Type": "application/json"},
            });
        case GET_DOOR_USERS_URL:
            if (req.method === "POST" && JSON.parse(String(req.body)).name.length) {
                const {name, notes} = JSON.parse(String(req.body));
                const id = users.length ? users[users.length - 1].id + 1 : 0;
                users.push({id, name, notes});
            }
            return Promise.resolve({
                body: JSON.stringify(req.method === "GET"
                    ? users
                    : {error_code: JSON.parse(String(req.body)).name === "" ? -1 : 0, msg: ""}),
                headers: {"Content-Type": "application/json"},
            });
        case GET_DOOR_DEVICES_URL:
            return Promise.resolve({
                body: JSON.stringify(devices),
                headers: {"Content-Type": "application/json"},
            })
    }
    if (req.url.startsWith(GET_DOOR_USERS_URL)) {
        const id = Number(req.url.substring(req.url.lastIndexOf('/') + 1));
        const target = users.find((it) => it.id === id);
        if (!target) return Promise.reject();
        if (req.method === "PUT") {
            const {name, notes} = JSON.parse(String(req.body));
            target.name = name;
            target.notes = notes;
        } else if (req.method === "DELETE") {
            users.splice(users.indexOf(target), 1);
        }
        return Promise.resolve({
            body: JSON.stringify(req.method === "GET" ? target : {error_code: 0, msg: ""}),
            headers: {"Content-Type": "application/json"},
        })
    }
});
