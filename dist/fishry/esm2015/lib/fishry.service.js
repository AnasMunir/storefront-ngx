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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvZmlzaHJ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFJeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7O01BSWxFLFNBQVMsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0FBSTFDLE1BQU0sT0FBTyxhQUFhOzs7Ozs7OztJQWF4QixZQUMyQixNQUFjLEVBQy9CLElBQVUsRUFDVixLQUFrQixFQUNHLFVBQWtCLEVBQ3ZDLEtBQW9CO1FBSkgsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMvQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUNHLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQWhCOUIsYUFBUSxHQUFrQjtZQUN4QixRQUFRLEVBQUUsS0FBSztZQUNmLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFF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WUE3QlgsSUFBSTtZQURKLFdBQVc7WUFpQ3lCLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXO1lBekJkLGFBQWE7Ozs7O0lBVXBCLGlDQVNDOztJQUdDLCtCQUF1Qzs7SUFDdkMsNkJBQWtCOztJQUNsQiw4QkFBMEI7O0lBQzFCLG1DQUErQzs7SUFDL0MsOEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5U3RvcmUgfSBmcm9tIFwiLi9zdG9yZS9maXNocnkuc3RvcmVcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgc2hhcmUsIGNhdGNoRXJyb3IsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBJR2VuZXJhbFNldHRpbmdzLCBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vc3RvcmUvbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuLy8gaW1wb3J0IHsgbWFrZVN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2ZlclN0YXRlLCBtYWtlU3RhdGVLZXkgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0ICogYXMgUmVkaXMgZnJvbSAncmVkaXMnO1xuXG5jb25zdCBTVEFURV9LRVkgPSBtYWtlU3RhdGVLZXkoJ2FwcFN0YXRlJyk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlTZXJ2aWNlIHtcblxuICBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgZ2VuZXJhbFNldHRpbmdzOiBudWxsLFxuICAgIHRoZW1lU2V0dGluZ3M6IG51bGwsXG4gICAgbmF2aWdhdGlvbjogbnVsbCxcbiAgICBzdG9yZVNldHRpbmdzOiBudWxsLFxuICAgIHN0b3JlSUQ6IG51bGwsXG4gICAgZG9tYWluOiBudWxsLFxuICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnZG9tYWluJykgcHVibGljIGRvbWFpbjogc3RyaW5nLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cCxcbiAgICBwcml2YXRlIHN0b3JlOiBGaXNocnlTdG9yZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIHN0YXRlOiBUcmFuc2ZlclN0YXRlXG4gICkge1xuICAgIHRoaXMuaW5pdERvbWFpbihkb21haW4pO1xuICAgIHRoaXMuYXBwU3RhdGUgPSB0aGlzLnN0YXRlLmdldChTVEFURV9LRVksIG51bGwgYXMgQXBwU3RhdGVNb2RlbCk7XG4gICAgaWYgKCF0aGlzLmFwcFN0YXRlKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwU3RhdGUgbm90IHNldCcpO1xuICAgICAgdGhpcy5pbml0R2VuZXJhbFNldHRpbmdzKGRvbWFpbikuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBTdGF0ZSBhbHJhZHkgc2V0Jyk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1NFVCcsIHtcbiAgICAgICAgaXNMb2FkZWQ6IHRoaXMuYXBwU3RhdGUuaXNMb2FkZWQsXG4gICAgICAgIGdlbmVyYWxTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS5nZW5lcmFsU2V0dGluZ3MsXG4gICAgICAgIHRoZW1lU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUudGhlbWVTZXR0aW5ncyxcbiAgICAgICAgbmF2aWdhdGlvbjogdGhpcy5hcHBTdGF0ZS5uYXZpZ2F0aW9uLFxuICAgICAgICBzdG9yZVNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLnN0b3JlU2V0dGluZ3MsXG4gICAgICAgIHN0b3JlSUQ6IHRoaXMuYXBwU3RhdGUuc3RvcmVJRCxcbiAgICAgICAgZG9tYWluOiB0aGlzLmFwcFN0YXRlLmRvbWFpbixcbiAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gICAgICB9KSk7XG4gICAgICBjb25zb2xlLmxvZygndGhlIHN0YXRlJywgdGhpcy5zdG9yZS5zdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdERvbWFpbihkb21haW46IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignU0VUJywgeyBkb21haW46IGRvbWFpbiB9KSk7XG4gIH1cblxuICBpbml0R2VuZXJhbFNldHRpbmdzKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hHZW5lcmFsU2V0dGluZ3ModGhpcy5kb21haW4pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKVxuICAgICAgfSksXG4gICAgICB0YXAoKHJlc3VsdDogSUdlbmVyYWxTZXR0aW5ncykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IGdlbmVyYWxTZXR0aW5nczogcmVzdWx0IH0pKTtcbiAgICAgICAgdGhpcy5pbml0VGhlbWVTZXR0aW5ncyhyZXN1bHQudGhlbWVfc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLmluaXRTdG9yZUlEKHJlc3VsdC5zdG9yZUlEKTtcbiAgICAgICAgdGhpcy5pbml0U3RvcmVTZXR0aW5ncyhyZXN1bHQuc2V0dGluZ3MpXG4gICAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24ocmVzdWx0Lm5hdl9kYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IGlzTG9hZGVkOiB0cnVlIH0pKTtcbiAgICAgICAgbGV0IGFwcFN0YXRlOiBBcHBTdGF0ZU1vZGVsID0ge1xuICAgICAgICAgIGlzTG9hZGVkOiB0aGlzLnN0b3JlLnN0YXRlLmlzTG9hZGVkLFxuICAgICAgICAgIGdlbmVyYWxTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS5nZW5lcmFsU2V0dGluZ3MsXG4gICAgICAgICAgdGhlbWVTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS50aGVtZVNldHRpbmdzLFxuICAgICAgICAgIG5hdmlnYXRpb246IHRoaXMuc3RvcmUuc3RhdGUubmF2aWdhdGlvbixcbiAgICAgICAgICBzdG9yZVNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLnN0b3JlU2V0dGluZ3MsXG4gICAgICAgICAgc3RvcmVJRDogdGhpcy5zdG9yZS5zdGF0ZS5zdG9yZUlELFxuICAgICAgICAgIGRvbWFpbjogdGhpcy5zdG9yZS5zdGF0ZS5kb21haW4sXG4gICAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5zZXQoU1RBVEVfS0VZLCBhcHBTdGF0ZSBhcyBBcHBTdGF0ZU1vZGVsKTtcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyb3IubWVzc2FnZSlcbiAgICAgIClcbiAgICApXG4gIH1cblxuICBpbml0VGhlbWVTZXR0aW5ncyh0aGVtZVNldHRpbmdzOiBhbnkpIHtcbiAgICB0aGVtZVNldHRpbmdzID0gSlNPTi5wYXJzZSh0aGVtZVNldHRpbmdzKTtcbiAgICBsZXQgbWFpbkJhbm5lciA9IHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lcjtcbiAgICBtYWluQmFubmVyID0gT2JqZWN0LmtleXMobWFpbkJhbm5lcikubWFwKGkgPT4gbWFpbkJhbm5lcltpXSk7XG4gICAgdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyID0gbWFpbkJhbm5lcjtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgdGhlbWVTZXR0aW5nczogdGhlbWVTZXR0aW5ncyB9KSlcbiAgfVxuXG4gIGZpeFRoZW1lU2V0dGluZ3NEYXRhKHRoZW1lU2V0dGluZ3M6IGFueSkge1xuICAgIGxldCBtYWluQmFubmVyID0gdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyO1xuICAgIG1haW5CYW5uZXIgPSBPYmplY3Qua2V5cyhtYWluQmFubmVyKS5tYXAoaSA9PiBtYWluQmFubmVyW2ldKTtcbiAgICB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXIgPSBtYWluQmFubmVyO1xuICB9XG5cbiAgaW5pdFN0b3JlSUQoc3RvcmVJRDogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHN0b3JlSUQ6IHN0b3JlSUQgfSkpXG4gIH1cblxuICBpbml0U3RvcmVTZXR0aW5ncyhzZXR0aW5nczogYW55KSB7XG4gICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgc3RvcmVTZXR0aW5nczogc2V0dGluZ3MgfSkpO1xuICB9XG5cbiAgaW5pdE5hdmlnYXRpb24obmF2aWdhdGlvbjogYW55KSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IG5hdmlnYXRpb246IG5hdmlnYXRpb24gfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBmZXRjaEdlbmVyYWxTZXR0aW5ncyhhcHBEb21haW4/OiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLmh0dHAuZ2V0KGBodHRwczovL2Zpc2hyeS1zdG9yZWZyb250LWFwaXMtc3RnLmF6dXJld2Vic2l0ZXMubmV0L2dldC1zdG9yZS1pbmZvP2RvbWFpbj0ke2FwcERvbWFpbn1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UucGlwZShcbiAgICAgIG1hcChyZXNwID0+IHJlc3AuanNvbigpLmRhdGEpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG4gIH1cbn1cblxuIl19