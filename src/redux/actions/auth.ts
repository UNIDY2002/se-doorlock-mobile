import {DO_LOGIN} from "../constants";

export type AuthAction = {
    type: typeof DO_LOGIN;
    payload: {
        username: string;
        password: string;
    };
};
