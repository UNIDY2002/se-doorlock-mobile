export interface Activity {
    repeat: number[]; // from 0 (Sunday) to 6 (Saturday)
    beginHour: number;
    beginMinute: number;
    endHour: number;
    endMinute: number;
    users: number[];
}

export interface Config {
    activities: Activity[];
}
