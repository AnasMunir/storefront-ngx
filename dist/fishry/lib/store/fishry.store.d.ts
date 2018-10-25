import { Subject, Observable } from 'rxjs';
import { AppStateModel } from "./models/fishry.model";
import { Action } from "./actions/fishry.actions";
export declare class FishryStore {
    private platformId;
    private _state$;
    actions: Subject<Action>;
    devTools: any;
    initialState: AppStateModel;
    constructor(platformId: Object);
    select$(path: string): Observable<any>;
    select(path: string): Promise<any>;
    dispatch(action: Action): void;
    readonly state: AppStateModel;
    readonly state$: Observable<AppStateModel>;
    setState(nextState: AppStateModel): void;
}
export declare const select: (path: any) => import("rxjs/internal/types").UnaryFunction<Observable<{}>, Observable<any>>;
