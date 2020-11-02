import {Auth} from "../states/auth";
import {defaultAuth} from "../defaults";
import {AuthAction} from "../actions/auth";
import {DO_LOGIN, DO_LOGOUT} from "../constants";

export const auth = (state: Auth = defaultAuth, action: AuthAction): Auth => {
    switch (action.type) {
        case DO_LOGIN:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                loggedIn: true,
            };
        case DO_LOGOUT:
            return {
                ...state,
                username: "",
                password: "",
                loggedIn: false,
            };
        default:
            return state;
    }
};
