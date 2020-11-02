import {ADD_ACTIVITY, REMOVE_ACTIVITY} from "../constants";
import {Activity} from "../states/config";

export type ConfigAction =
    | {type: typeof ADD_ACTIVITY; payload: Activity}
    | {type: typeof REMOVE_ACTIVITY; payload: Activity};
