import {Gender} from "./users";

export interface History {
    id: number;
    userId: number;
    deviceId: number;
    userName: string;
    time: string;
}

export interface Query {
    userId?: number;
    deviceId?: number;
    name?: string;
    gender?: Gender;
}
