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
const STATE_KEY = makeStateKey('appState');
export class FishryService {
    /**
     * @param {?} domain
     * @param {?} http
     * @param {?} store
     * @param {?} platformId
     * @param {?} state
     */
    constructor(domain, http, store, platformId, state) {
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
    initDomain(domain) {
        this.store.dispatch(new Action('SET', { domain: domain }));
    }
    /**
     * @param {?} domain
     * @return {?}
     */
    initGeneralSettings(domain) {
        return this.fetchGeneralSettings(this.domain).pipe(catchError((err) => {
            return throwError(err);
        }), tap((result) => {
            console.log('result', result);
            this.store.dispatch(new Action('UPDATE', { generalSettings: result }));
            this.initThemeSettings(result.theme_settings);
            this.initStoreID(result.storeID);
            this.initStoreSettings(result.settings);
            this.initNavigation(result.nav_data);
            this.store.dispatch(new Action('UPDATE', { isLoaded: true }));
            /** @type {?} */
            let appState = {
                isLoaded: this.store.state.isLoaded,
                generalSettings: this.store.state.generalSettings,
                themeSettings: this.store.state.themeSettings,
                navigation: this.store.state.navigation,
                storeSettings: this.store.state.storeSettings,
                storeID: this.store.state.storeID,
                domain: this.store.state.domain,
                isPlatformBrowser: false
            };
            this.state.set(STATE_KEY, (/** @type {?} */ (appState)));
        }, error => console.error('error', error.message)));
    }
    /**
     * @param {?} themeSettings
     * @return {?}
     */
    initThemeSettings(themeSettings) {
        themeSettings = JSON.parse(themeSettings);
        /** @type {?} */
        let mainBanner = themeSettings.mainBanner;
        mainBanner = Object.keys(mainBanner).map(i => mainBanner[i]);
        themeSettings.mainBanner = mainBanner;
        this.store.dispatch(new Action('UPDATE', { themeSettings: themeSettings }));
    }
    /**
     * @param {?} themeSettings
     * @return {?}
     */
    fixThemeSettingsData(themeSettings) {
        /** @type {?} */
        let mainBanner = themeSettings.mainBanner;
        mainBanner = Object.keys(mainBanner).map(i => mainBanner[i]);
        themeSettings.mainBanner = mainBanner;
    }
    /**
     * @param {?} storeID
     * @return {?}
     */
    initStoreID(storeID) {
        this.store.dispatch(new Action('UPDATE', { storeID: storeID }));
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    initStoreSettings(settings) {
        settings = JSON.parse(settings);
        this.store.dispatch(new Action('UPDATE', { storeSettings: settings }));
    }
    /**
     * @param {?} navigation
     * @return {?}
     */
    initNavigation(navigation) {
        this.store.dispatch(new Action('UPDATE', { navigation: navigation }));
    }
    /**
     * @param {?=} appDomain
     * @return {?}
     */
    fetchGeneralSettings(appDomain) {
        /** @type {?} */
        let response = this.http.get(`https://fishry-storefront-apis-stg.azurewebsites.net/get-store-info?domain=${appDomain}`);
        return response.pipe(map(resp => resp.json().data), share());
    }
}
FishryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FishryService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: ['domain',] }] },
    { type: Http },
    { type: FishryStore },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: TransferState }
];
/** @nocollapse */ FishryService.ngInjectableDef = i0.defineInjectable({ factory: function FishryService_Factory() { return new FishryService(i0.inject("domain"), i0.inject(i1.Http), i0.inject(i2.FishryStore), i0.inject(i0.PLATFORM_ID), i0.inject(i3.TransferState)); }, token: FishryService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvZmlzaHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O01BRWxFLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0FBSTFDLE1BQU0sT0FBTyxhQUFhOzs7Ozs7OztJQWF4QixZQUMyQixNQUFjLEVBQy9CLElBQVUsRUFDVixLQUFrQixFQUNHLFVBQWtCLEVBQ3ZDLEtBQW9CO1FBSkgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUNHLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQWhCOUIsYUFBUSxHQUFrQjtZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFF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WUEzQlgsSUFBSTtZQURKLFdBQVc7WUErQnlCLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO1lBdkJkLGFBQWE7Ozs7O0lBUXBCLGlDQVNDOztJQUdDLCtCQUF1Qzs7SUFDdkMsNkJBQWtCOztJQUNsQiw4QkFBMEI7O0lBQzFCLG1DQUErQzs7SUFDL0MsOEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5U3RvcmUgfSBmcm9tIFwiLi9zdG9yZS9maXNocnkuc3RvcmVcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgc2hhcmUsIGNhdGNoRXJyb3IsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBJR2VuZXJhbFNldHRpbmdzLCBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vc3RvcmUvbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuLy8gaW1wb3J0IHsgbWFrZVN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2ZlclN0YXRlLCBtYWtlU3RhdGVLZXkgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuY29uc3QgU1RBVEVfS0VZID0gbWFrZVN0YXRlS2V5KCdhcHBTdGF0ZScpO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U2VydmljZSB7XG5cbiAgYXBwU3RhdGU6IEFwcFN0YXRlTW9kZWwgPSB7XG4gICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgIGdlbmVyYWxTZXR0aW5nczogbnVsbCxcbiAgICB0aGVtZVNldHRpbmdzOiBudWxsLFxuICAgIG5hdmlnYXRpb246IG51bGwsXG4gICAgc3RvcmVTZXR0aW5nczogbnVsbCxcbiAgICBzdG9yZUlEOiBudWxsLFxuICAgIGRvbWFpbjogbnVsbCxcbiAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2RvbWFpbicpIHB1YmxpYyBkb21haW46IHN0cmluZyxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHAsXG4gICAgcHJpdmF0ZSBzdG9yZTogRmlzaHJ5U3RvcmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBzdGF0ZTogVHJhbnNmZXJTdGF0ZVxuICApIHtcbiAgICB0aGlzLmluaXREb21haW4oZG9tYWluKTtcbiAgICB0aGlzLmFwcFN0YXRlID0gdGhpcy5zdGF0ZS5nZXQoU1RBVEVfS0VZLCBudWxsIGFzIEFwcFN0YXRlTW9kZWwpO1xuICAgIGlmICghdGhpcy5hcHBTdGF0ZSkge1xuICAgICAgY29uc29sZS5sb2coJ2FwcFN0YXRlIG5vdCBzZXQnKTtcbiAgICAgIHRoaXMuaW5pdEdlbmVyYWxTZXR0aW5ncyhkb21haW4pLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwU3RhdGUgYWxyYWR5IHNldCcpO1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdTRVQnLCB7XG4gICAgICAgIGlzTG9hZGVkOiB0aGlzLmFwcFN0YXRlLmlzTG9hZGVkLFxuICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUuZ2VuZXJhbFNldHRpbmdzLFxuICAgICAgICB0aGVtZVNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLnRoZW1lU2V0dGluZ3MsXG4gICAgICAgIG5hdmlnYXRpb246IHRoaXMuYXBwU3RhdGUubmF2aWdhdGlvbixcbiAgICAgICAgc3RvcmVTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS5zdG9yZVNldHRpbmdzLFxuICAgICAgICBzdG9yZUlEOiB0aGlzLmFwcFN0YXRlLnN0b3JlSUQsXG4gICAgICAgIGRvbWFpbjogdGhpcy5hcHBTdGF0ZS5kb21haW4sXG4gICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICAgICAgfSkpO1xuICAgICAgY29uc29sZS5sb2coJ3RoZSBzdGF0ZScsdGhpcy5zdG9yZS5zdGF0ZSk7ICAgICBcbiAgICB9XG4gIH1cblxuICBpbml0RG9tYWluKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdTRVQnLCB7IGRvbWFpbjogZG9tYWluIH0pKTtcbiAgfVxuXG4gIGluaXRHZW5lcmFsU2V0dGluZ3MoZG9tYWluOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaEdlbmVyYWxTZXR0aW5ncyh0aGlzLmRvbWFpbikucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpXG4gICAgICB9KSxcbiAgICAgIHRhcCgocmVzdWx0OiBJR2VuZXJhbFNldHRpbmdzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgZ2VuZXJhbFNldHRpbmdzOiByZXN1bHQgfSkpO1xuICAgICAgICB0aGlzLmluaXRUaGVtZVNldHRpbmdzKHJlc3VsdC50aGVtZV9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlSUQocmVzdWx0LnN0b3JlSUQpO1xuICAgICAgICB0aGlzLmluaXRTdG9yZVNldHRpbmdzKHJlc3VsdC5zZXR0aW5ncylcbiAgICAgICAgdGhpcy5pbml0TmF2aWdhdGlvbihyZXN1bHQubmF2X2RhdGEpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgaXNMb2FkZWQ6IHRydWUgfSkpO1xuICAgICAgICBsZXQgYXBwU3RhdGU6IEFwcFN0YXRlTW9kZWwgPSB7XG4gICAgICAgICAgaXNMb2FkZWQ6IHRoaXMuc3RvcmUuc3RhdGUuaXNMb2FkZWQsXG4gICAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLmdlbmVyYWxTZXR0aW5ncyxcbiAgICAgICAgICB0aGVtZVNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLnRoZW1lU2V0dGluZ3MsXG4gICAgICAgICAgbmF2aWdhdGlvbjogdGhpcy5zdG9yZS5zdGF0ZS5uYXZpZ2F0aW9uLFxuICAgICAgICAgIHN0b3JlU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUuc3RvcmVTZXR0aW5ncyxcbiAgICAgICAgICBzdG9yZUlEOiB0aGlzLnN0b3JlLnN0YXRlLnN0b3JlSUQsXG4gICAgICAgICAgZG9tYWluOiB0aGlzLnN0b3JlLnN0YXRlLmRvbWFpbixcbiAgICAgICAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNldChTVEFURV9LRVksIGFwcFN0YXRlIGFzIEFwcFN0YXRlTW9kZWwpO1xuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcignZXJyb3InLCBlcnJvci5tZXNzYWdlKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIGluaXRUaGVtZVNldHRpbmdzKHRoZW1lU2V0dGluZ3M6IGFueSkge1xuICAgIHRoZW1lU2V0dGluZ3MgPSBKU09OLnBhcnNlKHRoZW1lU2V0dGluZ3MpO1xuICAgIGxldCBtYWluQmFubmVyID0gdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyO1xuICAgIG1haW5CYW5uZXIgPSBPYmplY3Qua2V5cyhtYWluQmFubmVyKS5tYXAoaSA9PiBtYWluQmFubmVyW2ldKTtcbiAgICB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXIgPSBtYWluQmFubmVyO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyB0aGVtZVNldHRpbmdzOiB0aGVtZVNldHRpbmdzIH0pKVxuICB9XG5cbiAgZml4VGhlbWVTZXR0aW5nc0RhdGEodGhlbWVTZXR0aW5nczogYW55KSB7XG4gICAgbGV0IG1haW5CYW5uZXIgPSB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXI7XG4gICAgbWFpbkJhbm5lciA9IE9iamVjdC5rZXlzKG1haW5CYW5uZXIpLm1hcChpID0+IG1haW5CYW5uZXJbaV0pO1xuICAgIHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lciA9IG1haW5CYW5uZXI7XG4gIH1cblxuICBpbml0U3RvcmVJRChzdG9yZUlEOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgc3RvcmVJRDogc3RvcmVJRCB9KSlcbiAgfVxuXG4gIGluaXRTdG9yZVNldHRpbmdzKHNldHRpbmdzOiBhbnkpIHtcbiAgICBzZXR0aW5ncyA9IEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBzdG9yZVNldHRpbmdzOiBzZXR0aW5ncyB9KSk7XG4gIH1cblxuICBpbml0TmF2aWdhdGlvbihuYXZpZ2F0aW9uOiBhbnkpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgbmF2aWdhdGlvbjogbmF2aWdhdGlvbiB9KSk7XG4gIH1cblxuICBwcml2YXRlIGZldGNoR2VuZXJhbFNldHRpbmdzKGFwcERvbWFpbj86IHN0cmluZykge1xuICAgIGxldCByZXNwb25zZSA9IHRoaXMuaHR0cC5nZXQoYGh0dHBzOi8vZmlzaHJ5LXN0b3JlZnJvbnQtYXBpcy1zdGcuYXp1cmV3ZWJzaXRlcy5uZXQvZ2V0LXN0b3JlLWluZm8/ZG9tYWluPSR7YXBwRG9tYWlufWApO1xuICAgIHJldHVybiByZXNwb25zZS5waXBlKFxuICAgICAgbWFwKHJlc3AgPT4gcmVzcC5qc29uKCkuZGF0YSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcbiAgfVxufVxuXG4iXX0=