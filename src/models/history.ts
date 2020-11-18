import {Gender} from "./users";

export interface History {
    id: number;
    userId: number;
    deviceId: number;
    userName: string;
    time: number;
    deviceDescription: string;
}

export interface Query {
    userId?: number;
    deviceId?: number;
    name?: string;
    gender?: Gender;
    begin?: number;
    end?: number;
}

export interface ActivityDetail {
    userId: number;
    deviceId?: number;
    name: string;
    time?: number;
}
