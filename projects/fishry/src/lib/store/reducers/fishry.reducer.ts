import { scan } from "rxjs/operators";

import * as FishryActions from '../actions/fishry.actions';
import { AppStateModel } from "../models/fishry.model";
import { omit } from "lodash";

export const reducer = () =>
	scan<any>((state: AppStateModel, action: FishryActions.Actions) => {
		let next;
		switch (action.type) {
			case FishryActions.SET:
				next = action.payload;
				break;
			case FishryActions.UPDATE:
				next = { ...state, ...action.payload };
				break;
			case FishryActions.DELETE:
				next = omit(state, action.payload);
				break;
			default:
				next = state;
				break;
		}
		/* if (state.isPlatformBrowser) {
			const win = window as any;
			win.devTools.send(action.type, next);
		} */

		return next;
	}, {});