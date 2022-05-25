export default class ResposeBase {
    public msg: string = "";
    public interMsg: string = "";
    public code: number = 0;
    public data: any[] = [];
    public timestamp?: string;
    public status?: number;
    public error?: string;
    public message?: string;
    public path?: string;
}
export class ResposeBaseGeneric<T> extends ResposeBase {
    declare data: T[];
}
export interface BaseData {
    deviceId: string;
    os: string;
    channel: string;
    userId: string;
    terminal: string;
    version: string;
}
export interface Upload {
    url: string
}