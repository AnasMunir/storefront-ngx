import { AppStateModel } from "../models/fishry.model";

export class Action {
	constructor(public type: string, public payload?: Partial<AppStateModel>) { }
}

export const SET = 'SET';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export class setTest implements Action {
	readonly type = 'SET';

	constructor(public payload: AppStateModel) { }
}

export class updateTest implements Action {
	readonly type = 'UPDATE';

	constructor(public payload: AppStateModel) { }
}

export class deleteTest implements Action {
	readonly type = 'DELETE';

	constructor(public payload: AppStateModel) { }
}

export type Actions = setTest | updateTest | deleteTest;