import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject, Observable, pipe, BehaviorSubject } from 'rxjs';
import { scan, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { reducer } from './reducers/fishry.reducer';
import { get, isEqual } from 'lodash';

import * as FishryActions from './actions/fishry.actions';
import { AppStateModel } from "./models/fishry.model";
import { Action } from "./actions/fishry.actions";
import { isPlatformBrowser } from "@angular/common";

// const win = window as any;


@Injectable({
	providedIn: 'root'
})
export class FishryStore {
	// state$: Observable<any>;
	private _state$: BehaviorSubject<AppStateModel>;
	actions: Subject<Action> = new Subject();

	devTools: any;
	initialState: AppStateModel;

	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
	) {

		this._state$ = new BehaviorSubject((this.initialState));
		// this.state$ = this._state$.asObservable();

		this.actions.pipe(
			reducer(),
			shareReplay(1),
		).subscribe((state) => this._state$.next(state));
		// Redux Dev Tools
		if (isPlatformBrowser(this.platformId)) {
			// const win = window as any;
			// win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();
		}
	}

	select$(path: string): Observable<any> {
		return this.state$.pipe(select(path));
	}

	select(path: string): Promise<any> {
		return this.state$.pipe(select(path)).toPromise()
	}

	dispatch(action: Action) {
		this.actions.next(action);
	}

	get state(): AppStateModel {
		return this._state$.getValue();
	}

	get state$(): Observable<AppStateModel> {
		return this._state$.asObservable();
	}

	setState(nextState: AppStateModel): void {
		this._state$.next(nextState);
	}

}

export const select = path =>
	pipe(
		map(state => get(state, path, null)),
		distinctUntilChanged(isEqual)
	)