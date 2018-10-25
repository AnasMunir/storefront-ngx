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
var FishryStore = /** @class */ (function () {
    function FishryStore(platformId) {
        var _this = this;
        this.platformId = platformId;
        this.actions = new Subject();
        this._state$ = new BehaviorSubject((this.initialState));
        // this.state$ = this._state$.asObservable();
        this.actions.pipe(reducer(), shareReplay(1)).subscribe(function (state) { return _this._state$.next(state); });
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
    FishryStore.prototype.select$ = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.state$.pipe(select(path));
    };
    /**
     * @param {?} path
     * @return {?}
     */
    FishryStore.prototype.select = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this.state$.pipe(select(path)).toPromise();
    };
    /**
     * @param {?} action
     * @return {?}
     */
    FishryStore.prototype.dispatch = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actions.next(action);
    };
    Object.defineProperty(FishryStore.prototype, "state", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FishryStore.prototype, "state$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._state$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} nextState
     * @return {?}
     */
    FishryStore.prototype.setState = /**
     * @param {?} nextState
     * @return {?}
     */
    function (nextState) {
        this._state$.next(nextState);
    };
    FishryStore.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FishryStore.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    /** @nocollapse */ FishryStore.ngInjectableDef = i0.defineInjectable({ factory: function FishryStore_Factory() { return new FishryStore(i0.inject(i0.PLATFORM_ID)); }, token: FishryStore, providedIn: "root" });
    return FishryStore;
}());
export { FishryStore };
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
export var select = function (path) {
    return pipe(map(function (state) { return get(state, path, null); }), distinctUntilChanged(isEqual));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlzaHJ5LyIsInNvdXJjZXMiOlsibGliL3N0b3JlL2Zpc2hyeS5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQWMsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQVEsR0FBRyxFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUt0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBS3BEO0lBV0MscUJBQzhCLFVBQWtCO1FBRGhELGlCQWdCQztRQWY2QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBTmhELFlBQU8sR0FBb0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQVN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEQsNkNBQTZDO1FBRTdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNoQixPQUFPLEVBQUUsRUFDVCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2QsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQ2pELGtCQUFrQjtRQUNsQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2Qyw2QkFBNkI7WUFDN0IsNkRBQTZEO1NBQzdEO0lBQ0YsQ0FBQzs7Ozs7SUFFRCw2QkFBTzs7OztJQUFQLFVBQVEsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsNEJBQU07Ozs7SUFBTixVQUFPLElBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNsRCxDQUFDOzs7OztJQUVELDhCQUFROzs7O0lBQVIsVUFBUyxNQUFjO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBSSw4QkFBSzs7OztRQUFUO1lBQ0MsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0JBQU07Ozs7UUFBVjtZQUNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTs7Ozs7SUFFRCw4QkFBUTs7OztJQUFSLFVBQVMsU0FBd0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBbkRELFVBQVUsU0FBQztvQkFDWCxVQUFVLEVBQUUsTUFBTTtpQkFDbEI7Ozs7Z0JBVTBDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOzs7c0JBMUJyQjtDQW1FQyxBQXJERCxJQXFEQztTQWxEWSxXQUFXOzs7SUFFdkIsOEJBQWdEOztJQUNoRCw4QkFBeUM7O0lBRXpDLCtCQUFjOztJQUNkLG1DQUE0Qjs7SUFHM0IsaUNBQStDOzs7QUEyQ2pELE1BQU0sS0FBTyxNQUFNLEdBQUcsVUFBQSxJQUFJO0lBQ3pCLE9BQUEsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLEVBQ3BDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUM3QjtBQUhELENBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlLCBwaXBlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNjYW4sIG1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgcmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcnMvZmlzaHJ5LnJlZHVjZXInO1xuaW1wb3J0IHsgZ2V0LCBpc0VxdWFsIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICogYXMgRmlzaHJ5QWN0aW9ucyBmcm9tICcuL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuL21vZGVscy9maXNocnkubW9kZWxcIjtcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gXCIuL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnNcIjtcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG4vLyBjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeVN0b3JlIHtcblx0Ly8gc3RhdGUkOiBPYnNlcnZhYmxlPGFueT47XG5cdHByaXZhdGUgX3N0YXRlJDogQmVoYXZpb3JTdWJqZWN0PEFwcFN0YXRlTW9kZWw+O1xuXHRhY3Rpb25zOiBTdWJqZWN0PEFjdGlvbj4gPSBuZXcgU3ViamVjdCgpO1xuXG5cdGRldlRvb2xzOiBhbnk7XG5cdGluaXRpYWxTdGF0ZTogQXBwU3RhdGVNb2RlbDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcblx0KSB7XG5cblx0XHR0aGlzLl9zdGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCh0aGlzLmluaXRpYWxTdGF0ZSkpO1xuXHRcdC8vIHRoaXMuc3RhdGUkID0gdGhpcy5fc3RhdGUkLmFzT2JzZXJ2YWJsZSgpO1xuXG5cdFx0dGhpcy5hY3Rpb25zLnBpcGUoXG5cdFx0XHRyZWR1Y2VyKCksXG5cdFx0XHRzaGFyZVJlcGxheSgxKSxcblx0XHQpLnN1YnNjcmliZSgoc3RhdGUpID0+IHRoaXMuX3N0YXRlJC5uZXh0KHN0YXRlKSk7XG5cdFx0Ly8gUmVkdXggRGV2IFRvb2xzXG5cdFx0aWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcblx0XHRcdC8vIGNvbnN0IHdpbiA9IHdpbmRvdyBhcyBhbnk7XG5cdFx0XHQvLyB3aW4uZGV2VG9vbHMgPSB3aW4uX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXy5jb25uZWN0KCk7XG5cdFx0fVxuXHR9XG5cblx0c2VsZWN0JChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlJC5waXBlKHNlbGVjdChwYXRoKSk7XG5cdH1cblxuXHRzZWxlY3QocGF0aDogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZSQucGlwZShzZWxlY3QocGF0aCkpLnRvUHJvbWlzZSgpXG5cdH1cblxuXHRkaXNwYXRjaChhY3Rpb246IEFjdGlvbikge1xuXHRcdHRoaXMuYWN0aW9ucy5uZXh0KGFjdGlvbik7XG5cdH1cblxuXHRnZXQgc3RhdGUoKTogQXBwU3RhdGVNb2RlbCB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlJC5nZXRWYWx1ZSgpO1xuXHR9XG5cblx0Z2V0IHN0YXRlJCgpOiBPYnNlcnZhYmxlPEFwcFN0YXRlTW9kZWw+IHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUkLmFzT2JzZXJ2YWJsZSgpO1xuXHR9XG5cblx0c2V0U3RhdGUobmV4dFN0YXRlOiBBcHBTdGF0ZU1vZGVsKTogdm9pZCB7XG5cdFx0dGhpcy5fc3RhdGUkLm5leHQobmV4dFN0YXRlKTtcblx0fVxuXG59XG5cbmV4cG9ydCBjb25zdCBzZWxlY3QgPSBwYXRoID0+XG5cdHBpcGUoXG5cdFx0bWFwKHN0YXRlID0+IGdldChzdGF0ZSwgcGF0aCwgbnVsbCkpLFxuXHRcdGRpc3RpbmN0VW50aWxDaGFuZ2VkKGlzRXF1YWwpXG5cdCkiXX0=