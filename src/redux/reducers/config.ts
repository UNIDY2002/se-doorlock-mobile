import {defaultConfig} from "../defaults";
import {ADD_ACTIVITY, REMOVE_ACTIVITY} from "../constants";
import {Config} from "../states/config";
import {ConfigAction} from "../actions/config";

export const config = (
    state: Config = defaultConfig,
    {type, payload}: ConfigAction,
): Config => {
    switch (type) {
        case ADD_ACTIVITY:
            if (state.activities.indexOf(payload) === -1) {
                return {
                    ...state,
                    activities: state.activities.concat(payload),
                };
            } else {
                return state;
            }
        case REMOVE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(
                    (activity) => activity !== payload,
                ),
            };
        default:
            return state;
    }
};
