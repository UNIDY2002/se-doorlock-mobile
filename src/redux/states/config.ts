import {DayOfWeek} from "../../utils/dayOfWeek";

export interface Activity {
    repeat: DayOfWeek[];
    beginHour: number;
    beginMinute: number;
    endHour: number;
    endMinute: number;
    users: number[];
    devices: number[];
}

export interface Config {
    activities: Activity[];
}
