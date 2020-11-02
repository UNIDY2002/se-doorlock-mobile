export interface Activity {
    repeat: number[];
    beginHour: number;
    beginMinute: number;
    endHour: number;
    endMinute: number;
}

export interface Config {
    activities: Activity[];
}
