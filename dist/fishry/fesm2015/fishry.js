import { scan, map, distinctUntilChanged, shareReplay, share, catchError, tap } from 'rxjs/operators';
import { omit, get, isEqual } from 'lodash';
import { Injectable, Inject, PLATFORM_ID, Component, Input, ViewChild, NgModule, defineInjectable, inject } from '@angular/core';
import { Subject, pipe, BehaviorSubject, throwError } from 'rxjs';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { NguCarouselModule } from '@ngu/carousel';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class Action {
    /**
     * @param {?} type
     * @param {?=} payload
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
/** @type {?} */
const SET = 'SET';
/** @type {?} */
const UPDATE = 'UPDATE';
/** @type {?} */
const DELETE = 'DELETE';
class setTest {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = 'SET';
    }
}
class updateTest {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = 'UPDATE';
    }
}
class deleteTest {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = 'DELETE';
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const reducer = () => scan((state, action) => {
    /** @type {?} */
    let next;
    switch (action.type) {
        case SET:
            next = action.payload;
            break;
        case UPDATE:
            next = Object.assign({}, state, action.payload);
            break;
        case DELETE:
            next = omit(state, action.payload);
            break;
        default:
            next = state;
            break;
    }
    /* if (state.isPlatformBrowser) {
        const win = window as any;
        win.devTools.send(action.type, next);
    } */
    return next;
}, {});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
// const win = window as any;
class FishryStore {
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
        if (isPlatformBrowser(this.platformId)) ;
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
/** @nocollapse */ FishryStore.ngInjectableDef = defineInjectable({ factory: function FishryStore_Factory() { return new FishryStore(inject(PLATFORM_ID)); }, token: FishryStore, providedIn: "root" });
/** @type {?} */
const select = path => pipe(map(state => get(state, path, null)), distinctUntilChanged(isEqual));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const STATE_KEY = makeStateKey('appState');
class FishryService {
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
        this.redisUrl = 'https://fishry-storefront-stg-ngx.azurewebsites.net';
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
        let response = this.http.get(`${this.redisUrl}/get-store-info?domain=${appDomain}`);
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
/** @nocollapse */ FishryService.ngInjectableDef = defineInjectable({ factory: function FishryService_Factory() { return new FishryService(inject("domain"), inject(Http), inject(FishryStore), inject(PLATFORM_ID), inject(TransferState)); }, token: FishryService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FishryComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
FishryComponent.decorators = [
    { type: Component, args: [{
                selector: 'fishry-fishry',
                template: `
    <p>
      fishry works!
    </p>
  `
            }] }
];
/** @nocollapse */
FishryComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FishryImageComponent {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
        this.src = '';
        this.route = 'product';
        this.size = '';
        this.enableLazyLoad = true;
        this.highResReady = false;
        // cdn: string = environment.cdn;
        this.cdn = 'https://fishry-image.azureedge.net/';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.highRes = new Image();
            this.activeLoad();
            if (this.enableLazyLoad) {
                this.lazyLoad();
            }
        }
    }
    /**
     * @return {?}
     */
    activeLoad() {
        this.img.nativeElement.onerror = () => {
            if (this.src) {
                this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}`;
            }
            else {
                this.img.nativeElement.onerror = null;
            }
        };
        if (this.src) {
            if (this.enableLazyLoad && this.size !== 'xxxs') {
                // If lazy loading is enabled, return xxs.
                this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}/xxs`;
            }
            else if (this.size) {
                // If lazy loading is disabled, and size is mentioned, return size.
                this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}/${this.size}`;
            }
            else {
                // If lazy loading is disabled and size is not mentioned, return full size.
                this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}`;
            }
        }
    }
    /**
     * @return {?}
     */
    lazyLoad() {
        if (this.size === '') {
            this.highRes.src = `${this.cdn}${this.route}/${this.src}`;
        }
        else {
            this.highRes.src = `${this.cdn}${this.route}/${this.src}/${this.size}`;
        }
        this.highRes.onload = () => {
            this.highResReady = true;
            this.img.nativeElement.src = this.highRes.src;
        };
        if (this.size) {
            this.highRes.onerror = () => {
                this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}`;
                this.highRes.onerror = null;
            };
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.img.nativeElement.onload = () => {
            if (!this.highResReady) {
                this.img.nativeElement.classList.add('loaded');
            }
            else {
                this.img.nativeElement.classList.remove('blur-in');
            }
        };
        // if (this.platformService.platformBrowser()) {
        // }
    }
}
FishryImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'fishry-image',
                template: "<img #img [ngClass]=\"{'blur-in': enableLazyLoad}\" class=\"img-fluid\" />",
                styles: [""]
            }] }
];
/** @nocollapse */
FishryImageComponent.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
FishryImageComponent.propDecorators = {
    src: [{ type: Input }],
    route: [{ type: Input }],
    size: [{ type: Input }],
    enableLazyLoad: [{ type: Input }],
    img: [{ type: ViewChild, args: ['img',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class CarouselComponent {
    constructor() {
        this.banner = [];
        this.carouselOne = {
            grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
            slide: 1,
            speed: 400,
            // interval: 4000,
            point: {
                visible: true
            },
            load: 2,
            touch: true,
            loop: true,
            custom: 'banner'
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'fishry-carousel',
                template: "<ngu-carousel #myCarousel [inputs]=\"carouselOne\" [dataSource]=\"banner\">\n  <!-- <ngu-item *ngFor=\"let banner of desktopBanner; let i = index\" (click)=\"routeTo(banner.link)\">\n    <img [src]=\"banner.image\" alt=\"\" class=\"img-fluid\">\n  </ngu-item>\n  <button NguCarouselPrev class='leftRs'>&lt;</button>\n  <button NguCarouselNext class='rightRs'>&gt;</button> -->\n\n\n  <ngu-tile *nguCarouselDef=\"let item; let j = index\">\n    <!-- <div class=\"tile\" [style.background]=\"'url(' + item + ')'\">\n      <h1>{{j}}</h1>\n    </div> -->\n    <img [src]=\"item.image\" alt=\"\" class=\"img-fluid\">\n  </ngu-tile>\n  <button NguCarouselPrev class=\"leftRs\">&lt;</button>\n  <button NguCarouselNext class=\"rightRs\">&gt;</button>\n  <!-- <ul class=\"myPoint\" NguCarouselPoint>\n    <li *ngFor=\"let j of myCarousel.pointNumbers; let j = index\" [class.active]=\"j==myCarousel.activePoint\" (click)=\"myCarousel.moveTo(j)\"\n      [style.background]=\"'url(' + images[j] + ')'\"></li>\n  </ul> -->\n</ngu-carousel>",
                styles: [".leftRs{position:absolute;margin:auto;top:0;bottom:0;width:50px;height:50px;box-shadow:1px 2px 10px -1px rgba(0,0,0,.3);border-radius:999px;left:0}.rightRs{position:absolute;margin:auto;top:0;bottom:0;width:50px;height:50px;box-shadow:1px 2px 10px -1px rgba(0,0,0,.3);border-radius:999px;right:0}"]
            }] }
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [];
CarouselComponent.propDecorators = {
    banner: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NavComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} item
     * @return {?}
     */
    listExists(item) {
        if (item.list && item.list.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    listEmpty(item) {
        if (item.list && item.list.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
NavComponent.decorators = [
    { type: Component, args: [{
                selector: 'fishry-nav',
                template: "<div class=\"navigation-block\" class=\"row\">\n  <div class=\"d-inline-block\" *ngFor=\"let item of menuItems\">\n    <button *ngIf=\"listExists(item)\" mat-button [matMenuTriggerFor]=\"subMenu1\">\n      {{item.name}}\n    </button>\n    <button *ngIf=\"listEmpty(item)\" mat-button>\n      {{item.name}}\n    </button>\n    <mat-menu #subMenu1=\"matMenu\">\n      <div *ngFor=\"let list of item.list\">\n        <button mat-menu-item *ngIf=\"listEmpty(list)\">{{list.name}}</button>\n        <button *ngIf=\"listExists(list)\" mat-menu-item [matMenuTriggerFor]=\"subMenu\">{{list.name}}</button>\n        <mat-menu #subMenu=\"matMenu\">\n          <button mat-menu-item *ngFor=\"let list of list.list\">{{list.name}}</button>\n        </mat-menu>\n      </div>\n    </mat-menu>\n  </div>\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
NavComponent.ctorParameters = () => [];
NavComponent.propDecorators = {
    menuItems: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class FishryModule {
    /**
     * @param {?} domain
     * @return {?}
     */
    static forRoot(domain) {
        return {
            ngModule: FishryModule,
            providers: [
                FishryService,
                {
                    provide: 'domain',
                    useValue: domain
                }
            ]
        };
    }
}
FishryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BrowserAnimationsModule,
                    MatMenuModule,
                    MatButtonModule,
                    NguCarouselModule
                ],
                declarations: [FishryComponent, FishryImageComponent, CarouselComponent, NavComponent],
                exports: [FishryComponent, FishryImageComponent, CarouselComponent, NavComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { FishryService, FishryComponent, FishryModule, FishryStore, select, Action, SET, UPDATE, DELETE, setTest, updateTest, deleteTest, CarouselComponent as ɵb, FishryImageComponent as ɵa, NavComponent as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9maXNocnkvbGliL3N0b3JlL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMudHMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvcmVkdWNlcnMvZmlzaHJ5LnJlZHVjZXIudHMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvZmlzaHJ5LnN0b3JlLnRzIiwibmc6Ly9maXNocnkvbGliL2Zpc2hyeS5zZXJ2aWNlLnRzIiwibmc6Ly9maXNocnkvbGliL2Zpc2hyeS5jb21wb25lbnQudHMiLCJuZzovL2Zpc2hyeS9saWIvY29tcG9uZW50cy9maXNocnktaW1hZ2UvZmlzaHJ5LWltYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL25hdi9uYXYuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2Zpc2hyeS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb24ge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgcGF5bG9hZD86IFBhcnRpYWw8QXBwU3RhdGVNb2RlbD4pIHsgfVxufVxuXG5leHBvcnQgY29uc3QgU0VUID0gJ1NFVCc7XG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ1VQREFURSc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5cbmV4cG9ydCBjbGFzcyBzZXRUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdTRVQnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIHVwZGF0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ1VQREFURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgZGVsZXRlVGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnREVMRVRFJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvbnMgPSBzZXRUZXN0IHwgdXBkYXRlVGVzdCB8IGRlbGV0ZVRlc3Q7IiwiaW1wb3J0IHsgc2NhbiB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9ICgpID0+XG5cdHNjYW48YW55Pigoc3RhdGU6IEFwcFN0YXRlTW9kZWwsIGFjdGlvbjogRmlzaHJ5QWN0aW9ucy5BY3Rpb25zKSA9PiB7XG5cdFx0bGV0IG5leHQ7XG5cdFx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xuXHRcdFx0Y2FzZSBGaXNocnlBY3Rpb25zLlNFVDpcblx0XHRcdFx0bmV4dCA9IGFjdGlvbi5wYXlsb2FkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5VUERBVEU6XG5cdFx0XHRcdG5leHQgPSB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5ERUxFVEU6XG5cdFx0XHRcdG5leHQgPSBvbWl0KHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0bmV4dCA9IHN0YXRlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0LyogaWYgKHN0YXRlLmlzUGxhdGZvcm1Ccm93c2VyKSB7XG5cdFx0XHRjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRcdFx0d2luLmRldlRvb2xzLnNlbmQoYWN0aW9uLnR5cGUsIG5leHQpO1xuXHRcdH0gKi9cblxuXHRcdHJldHVybiBuZXh0O1xuXHR9LCB7fSk7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgcGlwZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzY2FuLCBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXJzL2Zpc2hyeS5yZWR1Y2VyJztcbmltcG9ydCB7IGdldCwgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCAqIGFzIEZpc2hyeUFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuLy8gY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblxuXG5ASW5qZWN0YWJsZSh7XG5cdHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlTdG9yZSB7XG5cdC8vIHN0YXRlJDogT2JzZXJ2YWJsZTxhbnk+O1xuXHRwcml2YXRlIF9zdGF0ZSQ6IEJlaGF2aW9yU3ViamVjdDxBcHBTdGF0ZU1vZGVsPjtcblx0YWN0aW9uczogU3ViamVjdDxBY3Rpb24+ID0gbmV3IFN1YmplY3QoKTtcblxuXHRkZXZUb29sczogYW55O1xuXHRpbml0aWFsU3RhdGU6IEFwcFN0YXRlTW9kZWw7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0QEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG5cdCkge1xuXG5cdFx0dGhpcy5fc3RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgodGhpcy5pbml0aWFsU3RhdGUpKTtcblx0XHQvLyB0aGlzLnN0YXRlJCA9IHRoaXMuX3N0YXRlJC5hc09ic2VydmFibGUoKTtcblxuXHRcdHRoaXMuYWN0aW9ucy5waXBlKFxuXHRcdFx0cmVkdWNlcigpLFxuXHRcdFx0c2hhcmVSZXBsYXkoMSksXG5cdFx0KS5zdWJzY3JpYmUoKHN0YXRlKSA9PiB0aGlzLl9zdGF0ZSQubmV4dChzdGF0ZSkpO1xuXHRcdC8vIFJlZHV4IERldiBUb29sc1xuXHRcdGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG5cdFx0XHQvLyBjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRcdFx0Ly8gd2luLmRldlRvb2xzID0gd2luLl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18uY29ubmVjdCgpO1xuXHRcdH1cblx0fVxuXG5cdHNlbGVjdCQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZSQucGlwZShzZWxlY3QocGF0aCkpO1xuXHR9XG5cblx0c2VsZWN0KHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUkLnBpcGUoc2VsZWN0KHBhdGgpKS50b1Byb21pc2UoKVxuXHR9XG5cblx0ZGlzcGF0Y2goYWN0aW9uOiBBY3Rpb24pIHtcblx0XHR0aGlzLmFjdGlvbnMubmV4dChhY3Rpb24pO1xuXHR9XG5cblx0Z2V0IHN0YXRlKCk6IEFwcFN0YXRlTW9kZWwge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZSQuZ2V0VmFsdWUoKTtcblx0fVxuXG5cdGdldCBzdGF0ZSQoKTogT2JzZXJ2YWJsZTxBcHBTdGF0ZU1vZGVsPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdHNldFN0YXRlKG5leHRTdGF0ZTogQXBwU3RhdGVNb2RlbCk6IHZvaWQge1xuXHRcdHRoaXMuX3N0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG5cdH1cblxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0ID0gcGF0aCA9PlxuXHRwaXBlKFxuXHRcdG1hcChzdGF0ZSA9PiBnZXQoc3RhdGUsIHBhdGgsIG51bGwpKSxcblx0XHRkaXN0aW5jdFVudGlsQ2hhbmdlZChpc0VxdWFsKVxuXHQpIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5U3RvcmUgfSBmcm9tIFwiLi9zdG9yZS9maXNocnkuc3RvcmVcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgc2hhcmUsIGNhdGNoRXJyb3IsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBJR2VuZXJhbFNldHRpbmdzLCBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vc3RvcmUvbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuLy8gaW1wb3J0IHsgbWFrZVN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2ZlclN0YXRlLCBtYWtlU3RhdGVLZXkgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0ICogYXMgUmVkaXMgZnJvbSAncmVkaXMnO1xuXG5jb25zdCBTVEFURV9LRVkgPSBtYWtlU3RhdGVLZXkoJ2FwcFN0YXRlJyk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlTZXJ2aWNlIHtcblxuICBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgZ2VuZXJhbFNldHRpbmdzOiBudWxsLFxuICAgIHRoZW1lU2V0dGluZ3M6IG51bGwsXG4gICAgbmF2aWdhdGlvbjogbnVsbCxcbiAgICBzdG9yZVNldHRpbmdzOiBudWxsLFxuICAgIHN0b3JlSUQ6IG51bGwsXG4gICAgZG9tYWluOiBudWxsLFxuICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICB9O1xuXG4gIHByaXZhdGUgcmVkaXNVcmw6IHN0cmluZyA9ICdodHRwczovL2Zpc2hyeS1zdG9yZWZyb250LXN0Zy1uZ3guYXp1cmV3ZWJzaXRlcy5uZXQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2RvbWFpbicpIHB1YmxpYyBkb21haW46IHN0cmluZyxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHAsXG4gICAgcHJpdmF0ZSBzdG9yZTogRmlzaHJ5U3RvcmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBzdGF0ZTogVHJhbnNmZXJTdGF0ZVxuICApIHtcbiAgICB0aGlzLmluaXREb21haW4oZG9tYWluKTtcbiAgICB0aGlzLmFwcFN0YXRlID0gdGhpcy5zdGF0ZS5nZXQoU1RBVEVfS0VZLCBudWxsIGFzIEFwcFN0YXRlTW9kZWwpO1xuICAgIGlmICghdGhpcy5hcHBTdGF0ZSkge1xuICAgICAgY29uc29sZS5sb2coJ2FwcFN0YXRlIG5vdCBzZXQnKTtcbiAgICAgIHRoaXMuaW5pdEdlbmVyYWxTZXR0aW5ncyhkb21haW4pLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwU3RhdGUgYWxyYWR5IHNldCcpO1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdTRVQnLCB7XG4gICAgICAgIGlzTG9hZGVkOiB0aGlzLmFwcFN0YXRlLmlzTG9hZGVkLFxuICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUuZ2VuZXJhbFNldHRpbmdzLFxuICAgICAgICB0aGVtZVNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLnRoZW1lU2V0dGluZ3MsXG4gICAgICAgIG5hdmlnYXRpb246IHRoaXMuYXBwU3RhdGUubmF2aWdhdGlvbixcbiAgICAgICAgc3RvcmVTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS5zdG9yZVNldHRpbmdzLFxuICAgICAgICBzdG9yZUlEOiB0aGlzLmFwcFN0YXRlLnN0b3JlSUQsXG4gICAgICAgIGRvbWFpbjogdGhpcy5hcHBTdGF0ZS5kb21haW4sXG4gICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICAgICAgfSkpO1xuICAgICAgY29uc29sZS5sb2coJ3RoZSBzdGF0ZScsIHRoaXMuc3RvcmUuc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGluaXREb21haW4oZG9tYWluOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1NFVCcsIHsgZG9tYWluOiBkb21haW4gfSkpO1xuICB9XG5cbiAgaW5pdEdlbmVyYWxTZXR0aW5ncyhkb21haW46IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZldGNoR2VuZXJhbFNldHRpbmdzKHRoaXMuZG9tYWluKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycilcbiAgICAgIH0pLFxuICAgICAgdGFwKChyZXN1bHQ6IElHZW5lcmFsU2V0dGluZ3MpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBnZW5lcmFsU2V0dGluZ3M6IHJlc3VsdCB9KSk7XG4gICAgICAgIHRoaXMuaW5pdFRoZW1lU2V0dGluZ3MocmVzdWx0LnRoZW1lX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5pbml0U3RvcmVJRChyZXN1bHQuc3RvcmVJRCk7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlU2V0dGluZ3MocmVzdWx0LnNldHRpbmdzKVxuICAgICAgICB0aGlzLmluaXROYXZpZ2F0aW9uKHJlc3VsdC5uYXZfZGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBpc0xvYWRlZDogdHJ1ZSB9KSk7XG4gICAgICAgIGxldCBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICAgICAgICBpc0xvYWRlZDogdGhpcy5zdG9yZS5zdGF0ZS5pc0xvYWRlZCxcbiAgICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUuZ2VuZXJhbFNldHRpbmdzLFxuICAgICAgICAgIHRoZW1lU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUudGhlbWVTZXR0aW5ncyxcbiAgICAgICAgICBuYXZpZ2F0aW9uOiB0aGlzLnN0b3JlLnN0YXRlLm5hdmlnYXRpb24sXG4gICAgICAgICAgc3RvcmVTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS5zdG9yZVNldHRpbmdzLFxuICAgICAgICAgIHN0b3JlSUQ6IHRoaXMuc3RvcmUuc3RhdGUuc3RvcmVJRCxcbiAgICAgICAgICBkb21haW46IHRoaXMuc3RvcmUuc3RhdGUuZG9tYWluLFxuICAgICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KFNUQVRFX0tFWSwgYXBwU3RhdGUgYXMgQXBwU3RhdGVNb2RlbCk7XG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycm9yLm1lc3NhZ2UpXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgaW5pdFRoZW1lU2V0dGluZ3ModGhlbWVTZXR0aW5nczogYW55KSB7XG4gICAgdGhlbWVTZXR0aW5ncyA9IEpTT04ucGFyc2UodGhlbWVTZXR0aW5ncyk7XG4gICAgbGV0IG1haW5CYW5uZXIgPSB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXI7XG4gICAgbWFpbkJhbm5lciA9IE9iamVjdC5rZXlzKG1haW5CYW5uZXIpLm1hcChpID0+IG1haW5CYW5uZXJbaV0pO1xuICAgIHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lciA9IG1haW5CYW5uZXI7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHRoZW1lU2V0dGluZ3M6IHRoZW1lU2V0dGluZ3MgfSkpXG4gIH1cblxuICBmaXhUaGVtZVNldHRpbmdzRGF0YSh0aGVtZVNldHRpbmdzOiBhbnkpIHtcbiAgICBsZXQgbWFpbkJhbm5lciA9IHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lcjtcbiAgICBtYWluQmFubmVyID0gT2JqZWN0LmtleXMobWFpbkJhbm5lcikubWFwKGkgPT4gbWFpbkJhbm5lcltpXSk7XG4gICAgdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyID0gbWFpbkJhbm5lcjtcbiAgfVxuXG4gIGluaXRTdG9yZUlEKHN0b3JlSUQ6IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBzdG9yZUlEOiBzdG9yZUlEIH0pKVxuICB9XG5cbiAgaW5pdFN0b3JlU2V0dGluZ3Moc2V0dGluZ3M6IGFueSkge1xuICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5ncyk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHN0b3JlU2V0dGluZ3M6IHNldHRpbmdzIH0pKTtcbiAgfVxuXG4gIGluaXROYXZpZ2F0aW9uKG5hdmlnYXRpb246IGFueSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBuYXZpZ2F0aW9uOiBuYXZpZ2F0aW9uIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgZmV0Y2hHZW5lcmFsU2V0dGluZ3MoYXBwRG9tYWluPzogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5odHRwLmdldChgJHt0aGlzLnJlZGlzVXJsfS9nZXQtc3RvcmUtaW5mbz9kb21haW49JHthcHBEb21haW59YCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnBpcGUoXG4gICAgICBtYXAocmVzcCA9PiByZXNwLmpzb24oKS5kYXRhKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuICB9XG59XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1maXNocnknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgZmlzaHJ5IHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWltYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeUltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcm91dGU6IHN0cmluZyA9ICdwcm9kdWN0JztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGVuYWJsZUxhenlMb2FkOiBib29sZWFuID0gdHJ1ZTtcblxuICBAVmlld0NoaWxkKCdpbWcnKSBpbWc6IEVsZW1lbnRSZWY7XG4gIGhpZ2hSZXM6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGhpZ2hSZXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBjZG46IHN0cmluZyA9IGVudmlyb25tZW50LmNkbjtcbiAgY2RuOiBzdHJpbmcgPSAnaHR0cHM6Ly9maXNocnktaW1hZ2UuYXp1cmVlZGdlLm5ldC8nO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5oaWdoUmVzID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmFjdGl2ZUxvYWQoKTtcblxuICAgICAgaWYgKHRoaXMuZW5hYmxlTGF6eUxvYWQpIHtcbiAgICAgICAgdGhpcy5sYXp5TG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFjdGl2ZUxvYWQoKSB7XG4gICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9uZXJyb3IgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZUxhenlMb2FkICYmIHRoaXMuc2l6ZSAhPT0gJ3h4eHMnKSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBlbmFibGVkLCByZXR1cm4geHhzLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30veHhzYDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBkaXNhYmxlZCwgYW5kIHNpemUgaXMgbWVudGlvbmVkLCByZXR1cm4gc2l6ZS5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9LyR7dGhpcy5zaXplfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBsYXp5IGxvYWRpbmcgaXMgZGlzYWJsZWQgYW5kIHNpemUgaXMgbm90IG1lbnRpb25lZCwgcmV0dXJuIGZ1bGwgc2l6ZS5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsYXp5TG9hZCgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAnJykge1xuICAgICAgdGhpcy5oaWdoUmVzLnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZ2hSZXMuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS8ke3RoaXMuc2l6ZX1gO1xuICAgIH1cblxuICAgIHRoaXMuaGlnaFJlcy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmhpZ2hSZXNSZWFkeSA9IHRydWU7XG4gICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaGlnaFJlcy5zcmM7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgICB0aGlzLmhpZ2hSZXMub25lcnJvciA9IG51bGw7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5oaWdoUmVzUmVhZHkpIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYmx1ci1pbicpO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gaWYgKHRoaXMucGxhdGZvcm1TZXJ2aWNlLnBsYXRmb3JtQnJvd3NlcigpKSB7XG4gICAgLy8gfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxDb25maWcgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IElCYW5uZXIgfSBmcm9tICcuLi8uLi9zdG9yZS9tb2RlbHMvYmFubmVyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGJhbm5lcjogSUJhbm5lcltdID0gW107XG5cbiAgY2Fyb3VzZWxPbmU6IE5ndUNhcm91c2VsQ29uZmlnID0ge1xuICAgIGdyaWQ6IHsgeHM6IDEsIHNtOiAxLCBtZDogMSwgbGc6IDEsIGFsbDogMCB9LFxuICAgIHNsaWRlOiAxLFxuICAgIHNwZWVkOiA0MDAsXG4gICAgLy8gaW50ZXJ2YWw6IDQwMDAsXG4gICAgcG9pbnQ6IHtcbiAgICAgIHZpc2libGU6IHRydWVcbiAgICB9LFxuICAgIGxvYWQ6IDIsXG4gICAgdG91Y2g6IHRydWUsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBjdXN0b206ICdiYW5uZXInXG4gIH1cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1uYXYnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmF2LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVudUl0ZW1zOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxpc3RFeGlzdHMoaXRlbSk6IGJvb2xlYW4ge1xuICAgIGlmIChpdGVtLmxpc3QgJiYgaXRlbS5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbGlzdEVtcHR5KGl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAoaXRlbS5saXN0ICYmIGl0ZW0ubGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpc2hyeUNvbXBvbmVudCB9IGZyb20gJy4vZmlzaHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbE1vZHVsZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcbmltcG9ydCB7IEZpc2hyeVNlcnZpY2UgfSBmcm9tICcuL2Zpc2hyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpc2hyeUltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXZDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmF2L25hdi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE5ndUNhcm91c2VsTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Zpc2hyeUNvbXBvbmVudCwgRmlzaHJ5SW1hZ2VDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50LCBOYXZDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRmlzaHJ5Q29tcG9uZW50LCBGaXNocnlJbWFnZUNvbXBvbmVudCwgQ2Fyb3VzZWxDb21wb25lbnQsIE5hdkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5TW9kdWxlIHtcbiAgZG9tYWluOiBzdHJpbmc7XG4gIHN0YXRpYyBmb3JSb290KGRvbWFpbjogc3RyaW5nKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBGaXNocnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRmlzaHJ5U2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdkb21haW4nLFxuICAgICAgICAgIHVzZVZhbHVlOiBkb21haW5cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIkZpc2hyeUFjdGlvbnMuU0VUIiwiRmlzaHJ5QWN0aW9ucy5VUERBVEUiLCJGaXNocnlBY3Rpb25zLkRFTEVURSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBYSxNQUFNOzs7OztJQUNsQixZQUFtQixJQUFZLEVBQVMsT0FBZ0M7UUFBckQsU0FBSSxHQUFKLElB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