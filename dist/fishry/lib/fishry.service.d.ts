import { FishryStore } from "./store/fishry.store";
import { Http } from '@angular/http';
import { IGeneralSettings, AppStateModel } from "./store/models/fishry.model";
import { TransferState } from '@angular/platform-browser';
export declare class FishryService {
    domain: string;
    private http;
    private store;
    private platformId;
    private state;
    appState: AppStateModel;
    constructor(domain: string, http: Http, store: FishryStore, platformId: Object, state: TransferState);
    initDomain(domain: string): void;
    initGeneralSettings(domain: string): import("rxjs/internal/Observable").Observable<IGeneralSettings>;
    initThemeSettings(themeSettings: any): void;
    fixThemeSettingsData(themeSettings: any): void;
    initStoreID(storeID: string): void;
    initStoreSettings(settings: any): void;
    initNavigation(navigation: any): void;
    private fetchGeneralSettings;
}
