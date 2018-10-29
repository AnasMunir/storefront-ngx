/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { FishryStore } from "./store/fishry.store";
import { Http } from '@angular/http';
import { map, share, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Action } from './store/actions/fishry.actions';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@angular/http";
import * as i2 from "./store/fishry.store";
import * as i3 from "@angular/platform-browser";
/** @type {?} */
var STATE_KEY = makeStateKey('appState');
var FishryService = /** @class */ (function () {
    function FishryService(domain, http, store, platformId, state) {
        this.domain = domain;
        this.http = http;
        this.store = store;
        this.platformId = platformId;
        this.state = state;
        this.appState = {
            isLoaded: false,
            generalSettings: null,
            themeSettings: null,
            navigation: null,
            storeSettings: null,
            storeID: null,
            domain: null,
            isPlatformBrowser: false
        };
        this.initDomain(domain);
        this.appState = this.state.get(STATE_KEY, (/** @type {?} */ (null)));
        if (!this.appState) {
            console.log('appState not set');
            this.initGeneralSettings(domain).subscribe();
        }
        else {
            console.log('appState alrady set');
            this.store.dispatch(new Action('SET', {
                isLoaded: this.appState.isLoaded,
                generalSettings: this.appState.generalSettings,
                themeSettings: this.appState.themeSettings,
                navigation: this.appState.navigation,
                storeSettings: this.appState.storeSettings,
                storeID: this.appState.storeID,
                domain: this.appState.domain,
                isPlatformBrowser: false
            }));
            console.log('the state', this.store.state);
        }
    }
    /**
     * @param {?} domain
     * @return {?}
     */
    FishryService.prototype.initDomain = /**
     * @param {?} domain
     * @return {?}
     */
    function (domain) {
        this.store.dispatch(new Action('SET', { domain: domain }));
    };
    /**
     * @param {?} domain
     * @return {?}
     */
    FishryService.prototype.initGeneralSettings = /**
     * @param {?} domain
     * @return {?}
     */
    function (domain) {
        var _this = this;
        return this.fetchGeneralSettings(this.domain).pipe(catchError(function (err) {
            return throwError(err);
        }), tap(function (result) {
            console.log('result', result);
            _this.store.dispatch(new Action('UPDATE', { generalSettings: result }));
            _this.initThemeSettings(result.theme_settings);
            _this.initStoreID(result.storeID);
            _this.initStoreSettings(result.settings);
            _this.initNavigation(result.nav_data);
            _this.store.dispatch(new Action('UPDATE', { isLoaded: true }));
            /** @type {?} */
            var appState = {
                isLoaded: _this.store.state.isLoaded,
                generalSettings: _this.store.state.generalSettings,
                themeSettings: _this.store.state.themeSettings,
                navigation: _this.store.state.navigation,
                storeSettings: _this.store.state.storeSettings,
                storeID: _this.store.state.storeID,
                domain: _this.store.state.domain,
                isPlatformBrowser: false
            };
            _this.state.set(STATE_KEY, (/** @type {?} */ (appState)));
        }, function (error) { return console.error('error', error.message); }));
    };
    /**
     * @param {?} themeSettings
     * @return {?}
     */
    FishryService.prototype.initThemeSettings = /**
     * @param {?} themeSettings
     * @return {?}
     */
    function (themeSettings) {
        themeSettings = JSON.parse(themeSettings);
        /** @type {?} */
        var mainBanner = themeSettings.mainBanner;
        mainBanner = Object.keys(mainBanner).map(function (i) { return mainBanner[i]; });
        themeSettings.mainBanner = mainBanner;
        this.store.dispatch(new Action('UPDATE', { themeSettings: themeSettings }));
    };
    /**
     * @param {?} themeSettings
     * @return {?}
     */
    FishryService.prototype.fixThemeSettingsData = /**
     * @param {?} themeSettings
     * @return {?}
     */
    function (themeSettings) {
        /** @type {?} */
        var mainBanner = themeSettings.mainBanner;
        mainBanner = Object.keys(mainBanner).map(function (i) { return mainBanner[i]; });
        themeSettings.mainBanner = mainBanner;
    };
    /**
     * @param {?} storeID
     * @return {?}
     */
    FishryService.prototype.initStoreID = /**
     * @param {?} storeID
     * @return {?}
     */
    function (storeID) {
        this.store.dispatch(new Action('UPDATE', { storeID: storeID }));
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    FishryService.prototype.initStoreSettings = /**
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        settings = JSON.parse(settings);
        this.store.dispatch(new Action('UPDATE', { storeSettings: settings }));
    };
    /**
     * @param {?} navigation
     * @return {?}
     */
    FishryService.prototype.initNavigation = /**
     * @param {?} navigation
     * @return {?}
     */
    function (navigation) {
        this.store.dispatch(new Action('UPDATE', { navigation: navigation }));
    };
    /**
     * @param {?=} appDomain
     * @return {?}
     */
    FishryService.prototype.fetchGeneralSettings = /**
     * @param {?=} appDomain
     * @return {?}
     */
    function (appDomain) {
        /** @type {?} */
        var response = this.http.get("https://fishry-storefront-apis-stg.azurewebsites.net/get-store-info?domain=" + appDomain);
        return response.pipe(map(function (resp) { return resp.json().data; }), share());
    };
    FishryService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FishryService.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: ['domain',] }] },
        { type: Http },
        { type: FishryStore },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: TransferState }
    ]; };
    /** @nocollapse */ FishryService.ngInjectableDef = i0.defineInjectable({ factory: function FishryService_Factory() { return new FishryService(i0.inject("domain"), i0.inject(i1.Http), i0.inject(i2.FishryStore), i0.inject(i0.PLATFORM_ID), i0.inject(i3.TransferState)); }, token: FishryService, providedIn: "root" });
    return FishryService;
}());
export { FishryService };
if (false) {
    /** @type {?} */
    FishryService.prototype.appState;
    /** @type {?} */
    FishryService.prototype.domain;
    /** @type {?} */
    FishryService.prototype.http;
    /** @type {?} */
    FishryService.prototype.store;
    /** @type {?} */
    FishryService.prototype.platformId;
    /** @type {?} */
    FishryService.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvZmlzaHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0lBSWxFLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0FBQzFDO0lBZ0JFLHVCQUMyQixNQUFjLEVBQy9CLElBQVUsRUFDVixLQUFrQixFQUNHLFVBQWtCLEVBQ3ZDLEtBQW9CO1FBSkgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUNHLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQWhCOUIsYUFBUSxHQUFrQjtZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLElBQUk7WUFDWixpQkFBaUIsRUFB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Q1IsQ0FBQztJQUNKLENBQUM7O2dCQTlHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzZDQWVJLE1BQU0sU0FBQyxRQUFRO2dCQTdCWCxJQUFJO2dCQURKLFdBQVc7Z0JBaUN5QixNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztnQkF6QmQsYUFBYTs7O3dCQVR0QjtDQTZIQyxBQS9HRCxJQStHQztTQTVHWSxhQUFhOzs7SUFFeEIsaUNBU0M7O0lBR0MsK0JBQXVDOztJQUN2Qyw2QkFBa0I7O0lBQ2xCLDhCQUEwQjs7SUFDMUIsbUNBQStDOztJQUMvQyw4QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXNocnlTdG9yZSB9IGZyb20gXCIuL3N0b3JlL2Zpc2hyeS5zdG9yZVwiO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgbWFwLCBzaGFyZSwgY2F0Y2hFcnJvciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9zdG9yZS9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IElHZW5lcmFsU2V0dGluZ3MsIEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi9zdG9yZS9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG4vLyBpbXBvcnQgeyBtYWtlU3RhdGVLZXksIFRyYW5zZmVyU3RhdGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zZmVyU3RhdGUsIG1ha2VTdGF0ZUtleSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgKiBhcyBSZWRpcyBmcm9tICdyZWRpcyc7XG5cbmNvbnN0IFNUQVRFX0tFWSA9IG1ha2VTdGF0ZUtleSgnYXBwU3RhdGUnKTtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeVNlcnZpY2Uge1xuXG4gIGFwcFN0YXRlOiBBcHBTdGF0ZU1vZGVsID0ge1xuICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICBnZW5lcmFsU2V0dGluZ3M6IG51bGwsXG4gICAgdGhlbWVTZXR0aW5nczogbnVsbCxcbiAgICBuYXZpZ2F0aW9uOiBudWxsLFxuICAgIHN0b3JlU2V0dGluZ3M6IG51bGwsXG4gICAgc3RvcmVJRDogbnVsbCxcbiAgICBkb21haW46IG51bGwsXG4gICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdkb21haW4nKSBwdWJsaWMgZG9tYWluOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwLFxuICAgIHByaXZhdGUgc3RvcmU6IEZpc2hyeVN0b3JlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgc3RhdGU6IFRyYW5zZmVyU3RhdGVcbiAgKSB7XG4gICAgdGhpcy5pbml0RG9tYWluKGRvbWFpbik7XG4gICAgdGhpcy5hcHBTdGF0ZSA9IHRoaXMuc3RhdGUuZ2V0KFNUQVRFX0tFWSwgbnVsbCBhcyBBcHBTdGF0ZU1vZGVsKTtcbiAgICBpZiAoIXRoaXMuYXBwU3RhdGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBTdGF0ZSBub3Qgc2V0Jyk7XG4gICAgICB0aGlzLmluaXRHZW5lcmFsU2V0dGluZ3MoZG9tYWluKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ2FwcFN0YXRlIGFscmFkeSBzZXQnKTtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignU0VUJywge1xuICAgICAgICBpc0xvYWRlZDogdGhpcy5hcHBTdGF0ZS5pc0xvYWRlZCxcbiAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLmdlbmVyYWxTZXR0aW5ncyxcbiAgICAgICAgdGhlbWVTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS50aGVtZVNldHRpbmdzLFxuICAgICAgICBuYXZpZ2F0aW9uOiB0aGlzLmFwcFN0YXRlLm5hdmlnYXRpb24sXG4gICAgICAgIHN0b3JlU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUuc3RvcmVTZXR0aW5ncyxcbiAgICAgICAgc3RvcmVJRDogdGhpcy5hcHBTdGF0ZS5zdG9yZUlELFxuICAgICAgICBkb21haW46IHRoaXMuYXBwU3RhdGUuZG9tYWluLFxuICAgICAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgICAgIH0pKTtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGUgc3RhdGUnLCB0aGlzLnN0b3JlLnN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBpbml0RG9tYWluKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdTRVQnLCB7IGRvbWFpbjogZG9tYWluIH0pKTtcbiAgfVxuXG4gIGluaXRHZW5lcmFsU2V0dGluZ3MoZG9tYWluOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaEdlbmVyYWxTZXR0aW5ncyh0aGlzLmRvbWFpbikucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpXG4gICAgICB9KSxcbiAgICAgIHRhcCgocmVzdWx0OiBJR2VuZXJhbFNldHRpbmdzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgZ2VuZXJhbFNldHRpbmdzOiByZXN1bHQgfSkpO1xuICAgICAgICB0aGlzLmluaXRUaGVtZVNldHRpbmdzKHJlc3VsdC50aGVtZV9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlSUQocmVzdWx0LnN0b3JlSUQpO1xuICAgICAgICB0aGlzLmluaXRTdG9yZVNldHRpbmdzKHJlc3VsdC5zZXR0aW5ncylcbiAgICAgICAgdGhpcy5pbml0TmF2aWdhdGlvbihyZXN1bHQubmF2X2RhdGEpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgaXNMb2FkZWQ6IHRydWUgfSkpO1xuICAgICAgICBsZXQgYXBwU3RhdGU6IEFwcFN0YXRlTW9kZWwgPSB7XG4gICAgICAgICAgaXNMb2FkZWQ6IHRoaXMuc3RvcmUuc3RhdGUuaXNMb2FkZWQsXG4gICAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLmdlbmVyYWxTZXR0aW5ncyxcbiAgICAgICAgICB0aGVtZVNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLnRoZW1lU2V0dGluZ3MsXG4gICAgICAgICAgbmF2aWdhdGlvbjogdGhpcy5zdG9yZS5zdGF0ZS5uYXZpZ2F0aW9uLFxuICAgICAgICAgIHN0b3JlU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUuc3RvcmVTZXR0aW5ncyxcbiAgICAgICAgICBzdG9yZUlEOiB0aGlzLnN0b3JlLnN0YXRlLnN0b3JlSUQsXG4gICAgICAgICAgZG9tYWluOiB0aGlzLnN0b3JlLnN0YXRlLmRvbWFpbixcbiAgICAgICAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNldChTVEFURV9LRVksIGFwcFN0YXRlIGFzIEFwcFN0YXRlTW9kZWwpO1xuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcignZXJyb3InLCBlcnJvci5tZXNzYWdlKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIGluaXRUaGVtZVNldHRpbmdzKHRoZW1lU2V0dGluZ3M6IGFueSkge1xuICAgIHRoZW1lU2V0dGluZ3MgPSBKU09OLnBhcnNlKHRoZW1lU2V0dGluZ3MpO1xuICAgIGxldCBtYWluQmFubmVyID0gdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyO1xuICAgIG1haW5CYW5uZXIgPSBPYmplY3Qua2V5cyhtYWluQmFubmVyKS5tYXAoaSA9PiBtYWluQmFubmVyW2ldKTtcbiAgICB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXIgPSBtYWluQmFubmVyO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyB0aGVtZVNldHRpbmdzOiB0aGVtZVNldHRpbmdzIH0pKVxuICB9XG5cbiAgZml4VGhlbWVTZXR0aW5nc0RhdGEodGhlbWVTZXR0aW5nczogYW55KSB7XG4gICAgbGV0IG1haW5CYW5uZXIgPSB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXI7XG4gICAgbWFpbkJhbm5lciA9IE9iamVjdC5rZXlzKG1haW5CYW5uZXIpLm1hcChpID0+IG1haW5CYW5uZXJbaV0pO1xuICAgIHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lciA9IG1haW5CYW5uZXI7XG4gIH1cblxuICBpbml0U3RvcmVJRChzdG9yZUlEOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgc3RvcmVJRDogc3RvcmVJRCB9KSlcbiAgfVxuXG4gIGluaXRTdG9yZVNldHRpbmdzKHNldHRpbmdzOiBhbnkpIHtcbiAgICBzZXR0aW5ncyA9IEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBzdG9yZVNldHRpbmdzOiBzZXR0aW5ncyB9KSk7XG4gIH1cblxuICBpbml0TmF2aWdhdGlvbihuYXZpZ2F0aW9uOiBhbnkpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgbmF2aWdhdGlvbjogbmF2aWdhdGlvbiB9KSk7XG4gIH1cblxuICBwcml2YXRlIGZldGNoR2VuZXJhbFNldHRpbmdzKGFwcERvbWFpbj86IHN0cmluZykge1xuICAgIGxldCByZXNwb25zZSA9IHRoaXMuaHR0cC5nZXQoYGh0dHBzOi8vZmlzaHJ5LXN0b3JlZnJvbnQtYXBpcy1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQvZ2V0LXN0b3JlLWluZm8/ZG9tYWluPSR7YXBwRG9tYWlufWApO1xuICAgIHJldHVybiByZXNwb25zZS5waXBlKFxuICAgICAgbWFwKHJlc3AgPT4gcmVzcC5qc29uKCkuZGF0YSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcbiAgfVxufVxuXG4iXX0=