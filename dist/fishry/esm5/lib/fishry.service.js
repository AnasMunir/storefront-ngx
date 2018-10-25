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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvZmlzaHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O0lBRWxFLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0FBQzFDO0lBZ0JFLHVCQUMyQixNQUFjLEVBQy9CLElBQVUsRUFDVixLQUFrQixFQUNHLFVBQWtCLEVBQ3ZDLEtBQW9CO1FBSkgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUNHLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQWhCOUIsYUFBUSxHQUFrQjtZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLElBQUk7WUFDWixpQkFBaUIsRUFB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Q1IsQ0FBQztJQUNKLENBQUM7O2dCQTlHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzZDQWVJLE1BQU0sU0FBQyxRQUFRO2dCQTNCWCxJQUFJO2dCQURKLFdBQVc7Z0JBK0J5QixNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztnQkF2QmQsYUFBYTs7O3dCQVR0QjtDQTJIQyxBQS9HRCxJQStHQztTQTVHWSxhQUFhOzs7SUFFeEIsaUNBU0M7O0lBR0MsK0JBQXVDOztJQUN2Qyw2QkFBa0I7O0lBQ2xCLDhCQUEwQjs7SUFDMUIsbUNBQStDOztJQUMvQyw4QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXNocnlTdG9yZSB9IGZyb20gXCIuL3N0b3JlL2Zpc2hyeS5zdG9yZVwiO1xuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgbWFwLCBzaGFyZSwgY2F0Y2hFcnJvciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi9zdG9yZS9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IElHZW5lcmFsU2V0dGluZ3MsIEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi9zdG9yZS9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG4vLyBpbXBvcnQgeyBtYWtlU3RhdGVLZXksIFRyYW5zZmVyU3RhdGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRyYW5zZmVyU3RhdGUsIG1ha2VTdGF0ZUtleSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBTVEFURV9LRVkgPSBtYWtlU3RhdGVLZXkoJ2FwcFN0YXRlJyk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlTZXJ2aWNlIHtcblxuICBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgZ2VuZXJhbFNldHRpbmdzOiBudWxsLFxuICAgIHRoZW1lU2V0dGluZ3M6IG51bGwsXG4gICAgbmF2aWdhdGlvbjogbnVsbCxcbiAgICBzdG9yZVNldHRpbmdzOiBudWxsLFxuICAgIHN0b3JlSUQ6IG51bGwsXG4gICAgZG9tYWluOiBudWxsLFxuICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnZG9tYWluJykgcHVibGljIGRvbWFpbjogc3RyaW5nLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cCxcbiAgICBwcml2YXRlIHN0b3JlOiBGaXNocnlTdG9yZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIHN0YXRlOiBUcmFuc2ZlclN0YXRlXG4gICkge1xuICAgIHRoaXMuaW5pdERvbWFpbihkb21haW4pO1xuICAgIHRoaXMuYXBwU3RhdGUgPSB0aGlzLnN0YXRlLmdldChTVEFURV9LRVksIG51bGwgYXMgQXBwU3RhdGVNb2RlbCk7XG4gICAgaWYgKCF0aGlzLmFwcFN0YXRlKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwU3RhdGUgbm90IHNldCcpO1xuICAgICAgdGhpcy5pbml0R2VuZXJhbFNldHRpbmdzKGRvbWFpbikuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBTdGF0ZSBhbHJhZHkgc2V0Jyk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1NFVCcsIHtcbiAgICAgICAgaXNMb2FkZWQ6IHRoaXMuYXBwU3RhdGUuaXNMb2FkZWQsXG4gICAgICAgIGdlbmVyYWxTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS5nZW5lcmFsU2V0dGluZ3MsXG4gICAgICAgIHRoZW1lU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUudGhlbWVTZXR0aW5ncyxcbiAgICAgICAgbmF2aWdhdGlvbjogdGhpcy5hcHBTdGF0ZS5uYXZpZ2F0aW9uLFxuICAgICAgICBzdG9yZVNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLnN0b3JlU2V0dGluZ3MsXG4gICAgICAgIHN0b3JlSUQ6IHRoaXMuYXBwU3RhdGUuc3RvcmVJRCxcbiAgICAgICAgZG9tYWluOiB0aGlzLmFwcFN0YXRlLmRvbWFpbixcbiAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gICAgICB9KSk7XG4gICAgICBjb25zb2xlLmxvZygndGhlIHN0YXRlJyx0aGlzLnN0b3JlLnN0YXRlKTsgICAgIFxuICAgIH1cbiAgfVxuXG4gIGluaXREb21haW4oZG9tYWluOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1NFVCcsIHsgZG9tYWluOiBkb21haW4gfSkpO1xuICB9XG5cbiAgaW5pdEdlbmVyYWxTZXR0aW5ncyhkb21haW46IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZldGNoR2VuZXJhbFNldHRpbmdzKHRoaXMuZG9tYWluKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycilcbiAgICAgIH0pLFxuICAgICAgdGFwKChyZXN1bHQ6IElHZW5lcmFsU2V0dGluZ3MpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBnZW5lcmFsU2V0dGluZ3M6IHJlc3VsdCB9KSk7XG4gICAgICAgIHRoaXMuaW5pdFRoZW1lU2V0dGluZ3MocmVzdWx0LnRoZW1lX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5pbml0U3RvcmVJRChyZXN1bHQuc3RvcmVJRCk7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlU2V0dGluZ3MocmVzdWx0LnNldHRpbmdzKVxuICAgICAgICB0aGlzLmluaXROYXZpZ2F0aW9uKHJlc3VsdC5uYXZfZGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBpc0xvYWRlZDogdHJ1ZSB9KSk7XG4gICAgICAgIGxldCBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICAgICAgICBpc0xvYWRlZDogdGhpcy5zdG9yZS5zdGF0ZS5pc0xvYWRlZCxcbiAgICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUuZ2VuZXJhbFNldHRpbmdzLFxuICAgICAgICAgIHRoZW1lU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUudGhlbWVTZXR0aW5ncyxcbiAgICAgICAgICBuYXZpZ2F0aW9uOiB0aGlzLnN0b3JlLnN0YXRlLm5hdmlnYXRpb24sXG4gICAgICAgICAgc3RvcmVTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS5zdG9yZVNldHRpbmdzLFxuICAgICAgICAgIHN0b3JlSUQ6IHRoaXMuc3RvcmUuc3RhdGUuc3RvcmVJRCxcbiAgICAgICAgICBkb21haW46IHRoaXMuc3RvcmUuc3RhdGUuZG9tYWluLFxuICAgICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KFNUQVRFX0tFWSwgYXBwU3RhdGUgYXMgQXBwU3RhdGVNb2RlbCk7XG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycm9yLm1lc3NhZ2UpXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgaW5pdFRoZW1lU2V0dGluZ3ModGhlbWVTZXR0aW5nczogYW55KSB7XG4gICAgdGhlbWVTZXR0aW5ncyA9IEpTT04ucGFyc2UodGhlbWVTZXR0aW5ncyk7XG4gICAgbGV0IG1haW5CYW5uZXIgPSB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXI7XG4gICAgbWFpbkJhbm5lciA9IE9iamVjdC5rZXlzKG1haW5CYW5uZXIpLm1hcChpID0+IG1haW5CYW5uZXJbaV0pO1xuICAgIHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lciA9IG1haW5CYW5uZXI7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHRoZW1lU2V0dGluZ3M6IHRoZW1lU2V0dGluZ3MgfSkpXG4gIH1cblxuICBmaXhUaGVtZVNldHRpbmdzRGF0YSh0aGVtZVNldHRpbmdzOiBhbnkpIHtcbiAgICBsZXQgbWFpbkJhbm5lciA9IHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lcjtcbiAgICBtYWluQmFubmVyID0gT2JqZWN0LmtleXMobWFpbkJhbm5lcikubWFwKGkgPT4gbWFpbkJhbm5lcltpXSk7XG4gICAgdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyID0gbWFpbkJhbm5lcjtcbiAgfVxuXG4gIGluaXRTdG9yZUlEKHN0b3JlSUQ6IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBzdG9yZUlEOiBzdG9yZUlEIH0pKVxuICB9XG5cbiAgaW5pdFN0b3JlU2V0dGluZ3Moc2V0dGluZ3M6IGFueSkge1xuICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5ncyk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHN0b3JlU2V0dGluZ3M6IHNldHRpbmdzIH0pKTtcbiAgfVxuXG4gIGluaXROYXZpZ2F0aW9uKG5hdmlnYXRpb246IGFueSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBuYXZpZ2F0aW9uOiBuYXZpZ2F0aW9uIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgZmV0Y2hHZW5lcmFsU2V0dGluZ3MoYXBwRG9tYWluPzogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5odHRwLmdldChgaHR0cHM6Ly9maXNocnktc3RvcmVmcm9udC1hcGlzLXN0Zy5henVyZXdlYnNpdGVzLm5ldC9nZXQtc3RvcmUtaW5mbz9kb21haW49JHthcHBEb21haW59YCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnBpcGUoXG4gICAgICBtYXAocmVzcCA9PiByZXNwLmpzb24oKS5kYXRhKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuICB9XG59XG5cbiJdfQ==