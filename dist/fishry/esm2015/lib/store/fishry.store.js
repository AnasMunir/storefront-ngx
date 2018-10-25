/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Subject, pipe, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { reducer } from './reducers/fishry.reducer';
import { get, isEqual } from 'lodash';
import { isPlatformBrowser } from "@angular/common";
import * as i0 from "@angular/core";
// const win = window as any;
export class FishryStore {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
        this.actions = new Subject();
        this._state$ = new BehaviorSubject((this.initialState));
        // this.state$ = this._state$.asObservable();
        this.actions.pipe(reducer(), shareReplay(1)).subscribe((state) => this._state$.next(state));
        // Redux Dev Tools
        if (isPlatformBrowser(this.platformId)) {
            // const win = window as any;
            // win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();
        }
    }
    /**
     * @param {?} path
     * @return {?}
     */
    select$(path) {
        return this.state$.pipe(select(path));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    select(path) {
        return this.state$.pipe(select(path)).toPromise();
    }
    /**
     * @param {?} action
     * @return {?}
     */
    dispatch(action) {
        this.actions.next(action);
    }
    /**
     * @return {?}
     */
    get state() {
        return this._state$.getValue();
    }
    /**
     * @return {?}
     */
    get state$() {
        return this._state$.asObservable();
    }
    /**
     * @param {?} nextState
     * @return {?}
     */
    setState(nextState) {
        this._state$.next(nextState);
    }
}
FishryStore.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FishryStore.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
/** @nocollapse */ FishryStore.ngInjectableDef = i0.defineInjectable({ factory: function FishryStore_Factory() { return new FishryStore(i0.inject(i0.PLATFORM_ID)); }, token: FishryStore, providedIn: "root" });
if (false) {
    /** @type {?} */
    FishryStore.prototype._state$;
    /** @type {?} */
    FishryStore.prototype.actions;
    /** @type {?} */
    FishryStore.prototype.devTools;
    /** @type {?} */
    FishryStore.prototype.initialState;
    /** @type {?} */
    FishryStore.prototype.platformId;
}
/** @type {?} */
export const select = path => pipe(map(state => get(state, path, null)), distinctUntilChanged(isEqual));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlzaHJ5LyIsInNvdXJjZXMiOlsibGliL3N0b3JlL2Zpc2hyeS5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQWMsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQVEsR0FBRyxFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUt0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBUXBELE1BQU0sT0FBTyxXQUFXOzs7O0lBUXZCLFlBQzhCLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFOaEQsWUFBTyxHQUFvQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBU3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN4RCw2Q0FBNkM7UUFFN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2hCLE9BQU8sRUFBRSxFQUNULFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDZCxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqRCxrQkFBa0I7UUFDbEIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsNkJBQTZCO1lBQzdCLDZEQUE2RDtTQUM3RDtJQUNGLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDbEQsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsTUFBYztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxJQUFJLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsU0FBd0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBbkRELFVBQVUsU0FBQztnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNsQjs7OztZQVUwQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVzs7Ozs7SUFQcEIsOEJBQWdEOztJQUNoRCw4QkFBeUM7O0lBRXpDLCtCQUFjOztJQUNkLG1DQUE0Qjs7SUFHM0IsaUNBQStDOzs7QUEyQ2pELE1BQU0sT0FBTyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDNUIsSUFBSSxDQUNILEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQ3BDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUM3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIHBpcGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2NhbiwgbWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2Vycy9maXNocnkucmVkdWNlcic7XG5pbXBvcnQgeyBnZXQsIGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4vYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4vYWN0aW9ucy9maXNocnkuYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbi8vIGNvbnN0IHdpbiA9IHdpbmRvdyBhcyBhbnk7XG5cblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U3RvcmUge1xuXHQvLyBzdGF0ZSQ6IE9ic2VydmFibGU8YW55Pjtcblx0cHJpdmF0ZSBfc3RhdGUkOiBCZWhhdmlvclN1YmplY3Q8QXBwU3RhdGVNb2RlbD47XG5cdGFjdGlvbnM6IFN1YmplY3Q8QWN0aW9uPiA9IG5ldyBTdWJqZWN0KCk7XG5cblx0ZGV2VG9vbHM6IGFueTtcblx0aW5pdGlhbFN0YXRlOiBBcHBTdGF0ZU1vZGVsO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuXHQpIHtcblxuXHRcdHRoaXMuX3N0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoKHRoaXMuaW5pdGlhbFN0YXRlKSk7XG5cdFx0Ly8gdGhpcy5zdGF0ZSQgPSB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cblx0XHR0aGlzLmFjdGlvbnMucGlwZShcblx0XHRcdHJlZHVjZXIoKSxcblx0XHRcdHNoYXJlUmVwbGF5KDEpLFxuXHRcdCkuc3Vic2NyaWJlKChzdGF0ZSkgPT4gdGhpcy5fc3RhdGUkLm5leHQoc3RhdGUpKTtcblx0XHQvLyBSZWR1eCBEZXYgVG9vbHNcblx0XHRpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuXHRcdFx0Ly8gY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdC8vIHdpbi5kZXZUb29scyA9IHdpbi5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fLmNvbm5lY3QoKTtcblx0XHR9XG5cdH1cblxuXHRzZWxlY3QkKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUkLnBpcGUoc2VsZWN0KHBhdGgpKTtcblx0fVxuXG5cdHNlbGVjdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlJC5waXBlKHNlbGVjdChwYXRoKSkudG9Qcm9taXNlKClcblx0fVxuXG5cdGRpc3BhdGNoKGFjdGlvbjogQWN0aW9uKSB7XG5cdFx0dGhpcy5hY3Rpb25zLm5leHQoYWN0aW9uKTtcblx0fVxuXG5cdGdldCBzdGF0ZSgpOiBBcHBTdGF0ZU1vZGVsIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUkLmdldFZhbHVlKCk7XG5cdH1cblxuXHRnZXQgc3RhdGUkKCk6IE9ic2VydmFibGU8QXBwU3RhdGVNb2RlbD4ge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHRzZXRTdGF0ZShuZXh0U3RhdGU6IEFwcFN0YXRlTW9kZWwpOiB2b2lkIHtcblx0XHR0aGlzLl9zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IHBhdGggPT5cblx0cGlwZShcblx0XHRtYXAoc3RhdGUgPT4gZ2V0KHN0YXRlLCBwYXRoLCBudWxsKSksXG5cdFx0ZGlzdGluY3RVbnRpbENoYW5nZWQoaXNFcXVhbClcblx0KSJdfQ==