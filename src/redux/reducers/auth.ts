import {Auth} from "../states/auth";
import {defaultAuth} from "../defaults";
import {AuthAction} from "../actions/auth";
import {DO_LOGIN} from "../constants";

export const auth = (
    state: Auth = defaultAuth,
    {type, payload}: AuthAction,
): Auth => {
    switch (type) {
        case DO_LOGIN:
            return {
                ...state,
                username: payload.username,
                password: payload.password,
                loggedIn: true,
            };
        default:
            return state;
    }
};
