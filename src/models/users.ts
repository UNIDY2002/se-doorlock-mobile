export type Gender = "男" | "女" | "未知";

export interface AuthConfig {
    uri: string;
    headers: {Authorization: string};
}

export interface User {
    id: number;
    name: string;
    gender: Gender;
    description: string;
}
