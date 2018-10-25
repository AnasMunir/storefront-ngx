import { AppStateModel } from "../models/fishry.model";
export declare class Action {
    type: string;
    payload?: Partial<AppStateModel>;
    constructor(type: string, payload?: Partial<AppStateModel>);
}
export declare const SET = "SET";
export declare const UPDATE = "UPDATE";
export declare const DELETE = "DELETE";
export declare class setTest implements Action {
    payload: AppStateModel;
    readonly type = "SET";
    constructor(payload: AppStateModel);
}
export declare class updateTest implements Action {
    payload: AppStateModel;
    readonly type = "UPDATE";
    constructor(payload: AppStateModel);
}
export declare class deleteTest implements Action {
    payload: AppStateModel;
    readonly type = "DELETE";
    constructor(payload: AppStateModel);
}
export declare type Actions = setTest | updateTest | deleteTest;
