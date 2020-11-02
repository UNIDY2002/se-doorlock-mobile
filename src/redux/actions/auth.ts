import {DO_LOGIN, DO_LOGOUT} from "../constants";

export type AuthAction =
    | {
          type: typeof DO_LOGIN;
          payload: {
              username: string;
              password: string;
          };
      }
    | {type: typeof DO_LOGOUT; payload: undefined};
