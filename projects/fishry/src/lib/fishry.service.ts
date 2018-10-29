import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { FishryStore } from "./store/fishry.store";
import { Http } from '@angular/http';
import { map, share, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Action } from './store/actions/fishry.actions';
import { IGeneralSettings, AppStateModel } from "./store/models/fishry.model";
// import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import * as Redis from 'redis';

const STATE_KEY = makeStateKey('appState');
@Injectable({
  providedIn: 'root'
})
export class FishryService {

  appState: AppStateModel = {
    isLoaded: false,
    generalSettings: null,
    themeSettings: null,
    navigation: null,
    storeSettings: null,
    storeID: null,
    domain: null,
    isPlatformBrowser: false
  }

  constructor(
    @Inject('domain') public domain: string,
    private http: Http,
    private store: FishryStore,
    @Inject(PLATFORM_ID) private platformId: Object,
    private state: TransferState
  ) {
    this.initDomain(domain);
    this.appState = this.state.get(STATE_KEY, null as AppStateModel);
    if (!this.appState) {
      console.log('appState not set');
      this.initGeneralSettings(domain).subscribe();
    } else {
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

  initDomain(domain: string) {
    this.store.dispatch(new Action('SET', { domain: domain }));
  }

  initGeneralSettings(domain: string) {
    return this.fetchGeneralSettings(this.domain).pipe(
      catchError((err) => {
        return throwError(err)
      }),
      tap((result: IGeneralSettings) => {
        console.log('result', result);
        this.store.dispatch(new Action('UPDATE', { generalSettings: result }));
        this.initThemeSettings(result.theme_settings);
        this.initStoreID(result.storeID);
        this.initStoreSettings(result.settings)
        this.initNavigation(result.nav_data);
        this.store.dispatch(new Action('UPDATE', { isLoaded: true }));
        let appState: AppStateModel = {
          isLoaded: this.store.state.isLoaded,
          generalSettings: this.store.state.generalSettings,
          themeSettings: this.store.state.themeSettings,
          navigation: this.store.state.navigation,
          storeSettings: this.store.state.storeSettings,
          storeID: this.store.state.storeID,
          domain: this.store.state.domain,
          isPlatformBrowser: false
        }
        this.state.set(STATE_KEY, appState as AppStateModel);
      }, error => console.error('error', error.message)
      )
    )
  }

  initThemeSettings(themeSettings: any) {
    themeSettings = JSON.parse(themeSettings);
    let mainBanner = themeSettings.mainBanner;
    mainBanner = Object.keys(mainBanner).map(i => mainBanner[i]);
    themeSettings.mainBanner = mainBanner;
    this.store.dispatch(new Action('UPDATE', { themeSettings: themeSettings }))
  }

  fixThemeSettingsData(themeSettings: any) {
    let mainBanner = themeSettings.mainBanner;
    mainBanner = Object.keys(mainBanner).map(i => mainBanner[i]);
    themeSettings.mainBanner = mainBanner;
  }

  initStoreID(storeID: string) {
    this.store.dispatch(new Action('UPDATE', { storeID: storeID }))
  }

  initStoreSettings(settings: any) {
    settings = JSON.parse(settings);
    this.store.dispatch(new Action('UPDATE', { storeSettings: settings }));
  }

  initNavigation(navigation: any) {
    this.store.dispatch(new Action('UPDATE', { navigation: navigation }));
  }

  private fetchGeneralSettings(appDomain?: string) {
    let response = this.http.get(`https://fishry-storefront-apis-stg.azurewebsites.net/get-store-info?domain=${appDomain}`);
    return response.pipe(
      map(resp => resp.json().data),
      share()
    );
  }
}

