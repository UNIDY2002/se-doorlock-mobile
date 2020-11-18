import {Auth} from "./states/auth";
import {Config} from "./states/config";

export const defaultAuth: Auth = {
    username: "",
    password: "",
    loggedIn: false,
};

export const defaultConfig: Config = {
    activities: [
        {
            repeat: [1, 2, 3, 4, 5],
            beginHour: 7,
            beginMinute: 0,
            endHour: 9,
            endMinute: 0,
            users: [1, 2],
            devices: [1],
        },
    ],
};
