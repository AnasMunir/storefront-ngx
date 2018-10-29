import { __assign } from 'tslib';
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
var Action = /** @class */ (function () {
    function Action(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    return Action;
}());
/** @type {?} */
var SET = 'SET';
/** @type {?} */
var UPDATE = 'UPDATE';
/** @type {?} */
var DELETE = 'DELETE';
var setTest = /** @class */ (function () {
    function setTest(payload) {
        this.payload = payload;
        this.type = 'SET';
    }
    return setTest;
}());
var updateTest = /** @class */ (function () {
    function updateTest(payload) {
        this.payload = payload;
        this.type = 'UPDATE';
    }
    return updateTest;
}());
var deleteTest = /** @class */ (function () {
    function deleteTest(payload) {
        this.payload = payload;
        this.type = 'DELETE';
    }
    return deleteTest;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var reducer = function () {
    return scan(function (state, action) {
        /** @type {?} */
        var next;
        switch (action.type) {
            case SET:
                next = action.payload;
                break;
            case UPDATE:
                next = __assign({}, state, action.payload);
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
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
        if (isPlatformBrowser(this.platformId)) ;
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
    /** @nocollapse */ FishryStore.ngInjectableDef = defineInjectable({ factory: function FishryStore_Factory() { return new FishryStore(inject(PLATFORM_ID)); }, token: FishryStore, providedIn: "root" });
    return FishryStore;
}());
/** @type {?} */
var select = function (path) {
    return pipe(map(function (state) { return get(state, path, null); }), distinctUntilChanged(isEqual));
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ FishryService.ngInjectableDef = defineInjectable({ factory: function FishryService_Factory() { return new FishryService(inject("domain"), inject(Http), inject(FishryStore), inject(PLATFORM_ID), inject(TransferState)); }, token: FishryService, providedIn: "root" });
    return FishryService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FishryComponent = /** @class */ (function () {
    function FishryComponent() {
    }
    /**
     * @return {?}
     */
    FishryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    FishryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fishry-fishry',
                    template: "\n    <p>\n      fishry works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    FishryComponent.ctorParameters = function () { return []; };
    return FishryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FishryImageComponent = /** @class */ (function () {
    function FishryImageComponent(platformId) {
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
    FishryImageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId)) {
            this.highRes = new Image();
            this.activeLoad();
            if (this.enableLazyLoad) {
                this.lazyLoad();
            }
        }
    };
    /**
     * @return {?}
     */
    FishryImageComponent.prototype.activeLoad = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.img.nativeElement.onerror = function () {
            if (_this.src) {
                _this.img.nativeElement.src = "" + _this.cdn + _this.route + "/" + _this.src;
            }
            else {
                _this.img.nativeElement.onerror = null;
            }
        };
        if (this.src) {
            if (this.enableLazyLoad && this.size !== 'xxxs') {
                // If lazy loading is enabled, return xxs.
                this.img.nativeElement.src = "" + this.cdn + this.route + "/" + this.src + "/xxs";
            }
            else if (this.size) {
                // If lazy loading is disabled, and size is mentioned, return size.
                this.img.nativeElement.src = "" + this.cdn + this.route + "/" + this.src + "/" + this.size;
            }
            else {
                // If lazy loading is disabled and size is not mentioned, return full size.
                this.img.nativeElement.src = "" + this.cdn + this.route + "/" + this.src;
            }
        }
    };
    /**
     * @return {?}
     */
    FishryImageComponent.prototype.lazyLoad = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.size === '') {
            this.highRes.src = "" + this.cdn + this.route + "/" + this.src;
        }
        else {
            this.highRes.src = "" + this.cdn + this.route + "/" + this.src + "/" + this.size;
        }
        this.highRes.onload = function () {
            _this.highResReady = true;
            _this.img.nativeElement.src = _this.highRes.src;
        };
        if (this.size) {
            this.highRes.onerror = function () {
                _this.img.nativeElement.src = "" + _this.cdn + _this.route + "/" + _this.src;
                _this.highRes.onerror = null;
            };
        }
    };
    /**
     * @return {?}
     */
    FishryImageComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.img.nativeElement.onload = function () {
            if (!_this.highResReady) {
                _this.img.nativeElement.classList.add('loaded');
            }
            else {
                _this.img.nativeElement.classList.remove('blur-in');
            }
        };
        // if (this.platformService.platformBrowser()) {
        // }
    };
    FishryImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fishry-image',
                    template: "<img #img [ngClass]=\"{'blur-in': enableLazyLoad}\" class=\"img-fluid\" />",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FishryImageComponent.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    FishryImageComponent.propDecorators = {
        src: [{ type: Input }],
        route: [{ type: Input }],
        size: [{ type: Input }],
        enableLazyLoad: [{ type: Input }],
        img: [{ type: ViewChild, args: ['img',] }]
    };
    return FishryImageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent() {
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
    CarouselComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fishry-carousel',
                    template: "<ngu-carousel #myCarousel [inputs]=\"carouselOne\" [dataSource]=\"banner\">\n  <!-- <ngu-item *ngFor=\"let banner of desktopBanner; let i = index\" (click)=\"routeTo(banner.link)\">\n    <img [src]=\"banner.image\" alt=\"\" class=\"img-fluid\">\n  </ngu-item>\n  <button NguCarouselPrev class='leftRs'>&lt;</button>\n  <button NguCarouselNext class='rightRs'>&gt;</button> -->\n\n\n  <ngu-tile *nguCarouselDef=\"let item; let j = index\">\n    <!-- <div class=\"tile\" [style.background]=\"'url(' + item + ')'\">\n      <h1>{{j}}</h1>\n    </div> -->\n    <img [src]=\"item.image\" alt=\"\" class=\"img-fluid\">\n  </ngu-tile>\n  <button NguCarouselPrev class=\"leftRs\">&lt;</button>\n  <button NguCarouselNext class=\"rightRs\">&gt;</button>\n  <!-- <ul class=\"myPoint\" NguCarouselPoint>\n    <li *ngFor=\"let j of myCarousel.pointNumbers; let j = index\" [class.active]=\"j==myCarousel.activePoint\" (click)=\"myCarousel.moveTo(j)\"\n      [style.background]=\"'url(' + images[j] + ')'\"></li>\n  </ul> -->\n</ngu-carousel>",
                    styles: [".leftRs{position:absolute;margin:auto;top:0;bottom:0;width:50px;height:50px;box-shadow:1px 2px 10px -1px rgba(0,0,0,.3);border-radius:999px;left:0}.rightRs{position:absolute;margin:auto;top:0;bottom:0;width:50px;height:50px;box-shadow:1px 2px 10px -1px rgba(0,0,0,.3);border-radius:999px;right:0}"]
                }] }
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return []; };
    CarouselComponent.propDecorators = {
        banner: [{ type: Input }]
    };
    return CarouselComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NavComponent = /** @class */ (function () {
    function NavComponent() {
    }
    /**
     * @return {?}
     */
    NavComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NavComponent.prototype.listExists = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.list && item.list.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NavComponent.prototype.listEmpty = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (item.list && item.list.length == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    NavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fishry-nav',
                    template: "<div class=\"navigation-block\" class=\"row\">\n  <div class=\"d-inline-block\" *ngFor=\"let item of menuItems\">\n    <button *ngIf=\"listExists(item)\" mat-button [matMenuTriggerFor]=\"subMenu1\">\n      {{item.name}}\n    </button>\n    <button *ngIf=\"listEmpty(item)\" mat-button>\n      {{item.name}}\n    </button>\n    <mat-menu #subMenu1=\"matMenu\">\n      <div *ngFor=\"let list of item.list\">\n        <button mat-menu-item *ngIf=\"listEmpty(list)\">{{list.name}}</button>\n        <button *ngIf=\"listExists(list)\" mat-menu-item [matMenuTriggerFor]=\"subMenu\">{{list.name}}</button>\n        <mat-menu #subMenu=\"matMenu\">\n          <button mat-menu-item *ngFor=\"let list of list.list\">{{list.name}}</button>\n        </mat-menu>\n      </div>\n    </mat-menu>\n  </div>\n</div>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    NavComponent.ctorParameters = function () { return []; };
    NavComponent.propDecorators = {
        menuItems: [{ type: Input }]
    };
    return NavComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var FishryModule = /** @class */ (function () {
    function FishryModule() {
    }
    /**
     * @param {?} domain
     * @return {?}
     */
    FishryModule.forRoot = /**
     * @param {?} domain
     * @return {?}
     */
    function (domain) {
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
    };
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
    return FishryModule;
}());

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9maXNocnkvbGliL3N0b3JlL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMudHMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvcmVkdWNlcnMvZmlzaHJ5LnJlZHVjZXIudHMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvZmlzaHJ5LnN0b3JlLnRzIiwibmc6Ly9maXNocnkvbGliL2Zpc2hyeS5zZXJ2aWNlLnRzIiwibmc6Ly9maXNocnkvbGliL2Zpc2hyeS5jb21wb25lbnQudHMiLCJuZzovL2Zpc2hyeS9saWIvY29tcG9uZW50cy9maXNocnktaW1hZ2UvZmlzaHJ5LWltYWdlLmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL25hdi9uYXYuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2Zpc2hyeS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb24ge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgcGF5bG9hZD86IFBhcnRpYWw8QXBwU3RhdGVNb2RlbD4pIHsgfVxufVxuXG5leHBvcnQgY29uc3QgU0VUID0gJ1NFVCc7XG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ1VQREFURSc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5cbmV4cG9ydCBjbGFzcyBzZXRUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdTRVQnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIHVwZGF0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ1VQREFURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgZGVsZXRlVGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnREVMRVRFJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvbnMgPSBzZXRUZXN0IHwgdXBkYXRlVGVzdCB8IGRlbGV0ZVRlc3Q7IiwiaW1wb3J0IHsgc2NhbiB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9ICgpID0+XG5cdHNjYW48YW55Pigoc3RhdGU6IEFwcFN0YXRlTW9kZWwsIGFjdGlvbjogRmlzaHJ5QWN0aW9ucy5BY3Rpb25zKSA9PiB7XG5cdFx0bGV0IG5leHQ7XG5cdFx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xuXHRcdFx0Y2FzZSBGaXNocnlBY3Rpb25zLlNFVDpcblx0XHRcdFx0bmV4dCA9IGFjdGlvbi5wYXlsb2FkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5VUERBVEU6XG5cdFx0XHRcdG5leHQgPSB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5ERUxFVEU6XG5cdFx0XHRcdG5leHQgPSBvbWl0KHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0bmV4dCA9IHN0YXRlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0LyogaWYgKHN0YXRlLmlzUGxhdGZvcm1Ccm93c2VyKSB7XG5cdFx0XHRjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRcdFx0d2luLmRldlRvb2xzLnNlbmQoYWN0aW9uLnR5cGUsIG5leHQpO1xuXHRcdH0gKi9cblxuXHRcdHJldHVybiBuZXh0O1xuXHR9LCB7fSk7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgcGlwZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzY2FuLCBtYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXJzL2Zpc2hyeS5yZWR1Y2VyJztcbmltcG9ydCB7IGdldCwgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCAqIGFzIEZpc2hyeUFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zXCI7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuLy8gY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblxuXG5ASW5qZWN0YWJsZSh7XG5cdHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlTdG9yZSB7XG5cdC8vIHN0YXRlJDogT2JzZXJ2YWJsZTxhbnk+O1xuXHRwcml2YXRlIF9zdGF0ZSQ6IEJlaGF2aW9yU3ViamVjdDxBcHBTdGF0ZU1vZGVsPjtcblx0YWN0aW9uczogU3ViamVjdDxBY3Rpb24+ID0gbmV3IFN1YmplY3QoKTtcblxuXHRkZXZUb29sczogYW55O1xuXHRpbml0aWFsU3RhdGU6IEFwcFN0YXRlTW9kZWw7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0QEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG5cdCkge1xuXG5cdFx0dGhpcy5fc3RhdGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdCgodGhpcy5pbml0aWFsU3RhdGUpKTtcblx0XHQvLyB0aGlzLnN0YXRlJCA9IHRoaXMuX3N0YXRlJC5hc09ic2VydmFibGUoKTtcblxuXHRcdHRoaXMuYWN0aW9ucy5waXBlKFxuXHRcdFx0cmVkdWNlcigpLFxuXHRcdFx0c2hhcmVSZXBsYXkoMSksXG5cdFx0KS5zdWJzY3JpYmUoKHN0YXRlKSA9PiB0aGlzLl9zdGF0ZSQubmV4dChzdGF0ZSkpO1xuXHRcdC8vIFJlZHV4IERldiBUb29sc1xuXHRcdGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG5cdFx0XHQvLyBjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRcdFx0Ly8gd2luLmRldlRvb2xzID0gd2luLl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX18uY29ubmVjdCgpO1xuXHRcdH1cblx0fVxuXG5cdHNlbGVjdCQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5zdGF0ZSQucGlwZShzZWxlY3QocGF0aCkpO1xuXHR9XG5cblx0c2VsZWN0KHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUkLnBpcGUoc2VsZWN0KHBhdGgpKS50b1Byb21pc2UoKVxuXHR9XG5cblx0ZGlzcGF0Y2goYWN0aW9uOiBBY3Rpb24pIHtcblx0XHR0aGlzLmFjdGlvbnMubmV4dChhY3Rpb24pO1xuXHR9XG5cblx0Z2V0IHN0YXRlKCk6IEFwcFN0YXRlTW9kZWwge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZSQuZ2V0VmFsdWUoKTtcblx0fVxuXG5cdGdldCBzdGF0ZSQoKTogT2JzZXJ2YWJsZTxBcHBTdGF0ZU1vZGVsPiB7XG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlJC5hc09ic2VydmFibGUoKTtcblx0fVxuXG5cdHNldFN0YXRlKG5leHRTdGF0ZTogQXBwU3RhdGVNb2RlbCk6IHZvaWQge1xuXHRcdHRoaXMuX3N0YXRlJC5uZXh0KG5leHRTdGF0ZSk7XG5cdH1cblxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0ID0gcGF0aCA9PlxuXHRwaXBlKFxuXHRcdG1hcChzdGF0ZSA9PiBnZXQoc3RhdGUsIHBhdGgsIG51bGwpKSxcblx0XHRkaXN0aW5jdFVudGlsQ2hhbmdlZChpc0VxdWFsKVxuXHQpIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5U3RvcmUgfSBmcm9tIFwiLi9zdG9yZS9maXNocnkuc3RvcmVcIjtcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IG1hcCwgc2hhcmUsIGNhdGNoRXJyb3IsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJy4vc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBJR2VuZXJhbFNldHRpbmdzLCBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vc3RvcmUvbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuLy8gaW1wb3J0IHsgbWFrZVN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2ZlclN0YXRlLCBtYWtlU3RhdGVLZXkgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0ICogYXMgUmVkaXMgZnJvbSAncmVkaXMnO1xuXG5jb25zdCBTVEFURV9LRVkgPSBtYWtlU3RhdGVLZXkoJ2FwcFN0YXRlJyk7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlTZXJ2aWNlIHtcblxuICBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICBpc0xvYWRlZDogZmFsc2UsXG4gICAgZ2VuZXJhbFNldHRpbmdzOiBudWxsLFxuICAgIHRoZW1lU2V0dGluZ3M6IG51bGwsXG4gICAgbmF2aWdhdGlvbjogbnVsbCxcbiAgICBzdG9yZVNldHRpbmdzOiBudWxsLFxuICAgIHN0b3JlSUQ6IG51bGwsXG4gICAgZG9tYWluOiBudWxsLFxuICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnZG9tYWluJykgcHVibGljIGRvbWFpbjogc3RyaW5nLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cCxcbiAgICBwcml2YXRlIHN0b3JlOiBGaXNocnlTdG9yZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIHN0YXRlOiBUcmFuc2ZlclN0YXRlXG4gICkge1xuICAgIHRoaXMuaW5pdERvbWFpbihkb21haW4pO1xuICAgIHRoaXMuYXBwU3RhdGUgPSB0aGlzLnN0YXRlLmdldChTVEFURV9LRVksIG51bGwgYXMgQXBwU3RhdGVNb2RlbCk7XG4gICAgaWYgKCF0aGlzLmFwcFN0YXRlKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwU3RhdGUgbm90IHNldCcpO1xuICAgICAgdGhpcy5pbml0R2VuZXJhbFNldHRpbmdzKGRvbWFpbikuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBTdGF0ZSBhbHJhZHkgc2V0Jyk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1NFVCcsIHtcbiAgICAgICAgaXNMb2FkZWQ6IHRoaXMuYXBwU3RhdGUuaXNMb2FkZWQsXG4gICAgICAgIGdlbmVyYWxTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS5nZW5lcmFsU2V0dGluZ3MsXG4gICAgICAgIHRoZW1lU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUudGhlbWVTZXR0aW5ncyxcbiAgICAgICAgbmF2aWdhdGlvbjogdGhpcy5hcHBTdGF0ZS5uYXZpZ2F0aW9uLFxuICAgICAgICBzdG9yZVNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLnN0b3JlU2V0dGluZ3MsXG4gICAgICAgIHN0b3JlSUQ6IHRoaXMuYXBwU3RhdGUuc3RvcmVJRCxcbiAgICAgICAgZG9tYWluOiB0aGlzLmFwcFN0YXRlLmRvbWFpbixcbiAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gICAgICB9KSk7XG4gICAgICBjb25zb2xlLmxvZygndGhlIHN0YXRlJywgdGhpcy5zdG9yZS5zdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdERvbWFpbihkb21haW46IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignU0VUJywgeyBkb21haW46IGRvbWFpbiB9KSk7XG4gIH1cblxuICBpbml0R2VuZXJhbFNldHRpbmdzKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hHZW5lcmFsU2V0dGluZ3ModGhpcy5kb21haW4pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKVxuICAgICAgfSksXG4gICAgICB0YXAoKHJlc3VsdDogSUdlbmVyYWxTZXR0aW5ncykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IGdlbmVyYWxTZXR0aW5nczogcmVzdWx0IH0pKTtcbiAgICAgICAgdGhpcy5pbml0VGhlbWVTZXR0aW5ncyhyZXN1bHQudGhlbWVfc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLmluaXRTdG9yZUlEKHJlc3VsdC5zdG9yZUlEKTtcbiAgICAgICAgdGhpcy5pbml0U3RvcmVTZXR0aW5ncyhyZXN1bHQuc2V0dGluZ3MpXG4gICAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24ocmVzdWx0Lm5hdl9kYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IGlzTG9hZGVkOiB0cnVlIH0pKTtcbiAgICAgICAgbGV0IGFwcFN0YXRlOiBBcHBTdGF0ZU1vZGVsID0ge1xuICAgICAgICAgIGlzTG9hZGVkOiB0aGlzLnN0b3JlLnN0YXRlLmlzTG9hZGVkLFxuICAgICAgICAgIGdlbmVyYWxTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS5nZW5lcmFsU2V0dGluZ3MsXG4gICAgICAgICAgdGhlbWVTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS50aGVtZVNldHRpbmdzLFxuICAgICAgICAgIG5hdmlnYXRpb246IHRoaXMuc3RvcmUuc3RhdGUubmF2aWdhdGlvbixcbiAgICAgICAgICBzdG9yZVNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLnN0b3JlU2V0dGluZ3MsXG4gICAgICAgICAgc3RvcmVJRDogdGhpcy5zdG9yZS5zdGF0ZS5zdG9yZUlELFxuICAgICAgICAgIGRvbWFpbjogdGhpcy5zdG9yZS5zdGF0ZS5kb21haW4sXG4gICAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5zZXQoU1RBVEVfS0VZLCBhcHBTdGF0ZSBhcyBBcHBTdGF0ZU1vZGVsKTtcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyb3IubWVzc2FnZSlcbiAgICAgIClcbiAgICApXG4gIH1cblxuICBpbml0VGhlbWVTZXR0aW5ncyh0aGVtZVNldHRpbmdzOiBhbnkpIHtcbiAgICB0aGVtZVNldHRpbmdzID0gSlNPTi5wYXJzZSh0aGVtZVNldHRpbmdzKTtcbiAgICBsZXQgbWFpbkJhbm5lciA9IHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lcjtcbiAgICBtYWluQmFubmVyID0gT2JqZWN0LmtleXMobWFpbkJhbm5lcikubWFwKGkgPT4gbWFpbkJhbm5lcltpXSk7XG4gICAgdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyID0gbWFpbkJhbm5lcjtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgdGhlbWVTZXR0aW5nczogdGhlbWVTZXR0aW5ncyB9KSlcbiAgfVxuXG4gIGZpeFRoZW1lU2V0dGluZ3NEYXRhKHRoZW1lU2V0dGluZ3M6IGFueSkge1xuICAgIGxldCBtYWluQmFubmVyID0gdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyO1xuICAgIG1haW5CYW5uZXIgPSBPYmplY3Qua2V5cyhtYWluQmFubmVyKS5tYXAoaSA9PiBtYWluQmFubmVyW2ldKTtcbiAgICB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXIgPSBtYWluQmFubmVyO1xuICB9XG5cbiAgaW5pdFN0b3JlSUQoc3RvcmVJRDogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHN0b3JlSUQ6IHN0b3JlSUQgfSkpXG4gIH1cblxuICBpbml0U3RvcmVTZXR0aW5ncyhzZXR0aW5nczogYW55KSB7XG4gICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgc3RvcmVTZXR0aW5nczogc2V0dGluZ3MgfSkpO1xuICB9XG5cbiAgaW5pdE5hdmlnYXRpb24obmF2aWdhdGlvbjogYW55KSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IG5hdmlnYXRpb246IG5hdmlnYXRpb24gfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBmZXRjaEdlbmVyYWxTZXR0aW5ncyhhcHBEb21haW4/OiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLmh0dHAuZ2V0KGBodHRwczovL2Zpc2hyeS1zdG9yZWZyb250LWFwaXMtc3RnLmF6dXJld2Vic2l0ZXMubmV0L2dldC1zdG9yZS1pbmZvP2RvbWFpbj0ke2FwcERvbWFpbn1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UucGlwZShcbiAgICAgIG1hcChyZXNwID0+IHJlc3AuanNvbigpLmRhdGEpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWZpc2hyeScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBmaXNocnkgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktaW1hZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5SW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBzcmM6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJ3Byb2R1Y3QnO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgZW5hYmxlTGF6eUxvYWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltZycpIGltZzogRWxlbWVudFJlZjtcbiAgaGlnaFJlczogSFRNTEltYWdlRWxlbWVudDtcbiAgaGlnaFJlc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gIC8vIGNkbjogc3RyaW5nID0gZW52aXJvbm1lbnQuY2RuO1xuICBjZG46IHN0cmluZyA9ICdodHRwczovL2Zpc2hyeS1pbWFnZS5henVyZWVkZ2UubmV0Lyc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuYWN0aXZlTG9hZCgpO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVMYXp5TG9hZCkge1xuICAgICAgICB0aGlzLmxhenlMb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlTG9hZCgpIHtcbiAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25lcnJvciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlTGF6eUxvYWQgJiYgdGhpcy5zaXplICE9PSAneHh4cycpIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGVuYWJsZWQsIHJldHVybiB4eHMuXG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS94eHNgO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGRpc2FibGVkLCBhbmQgc2l6ZSBpcyBtZW50aW9uZWQsIHJldHVybiBzaXplLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30vJHt0aGlzLnNpemV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBkaXNhYmxlZCBhbmQgc2l6ZSBpcyBub3QgbWVudGlvbmVkLCByZXR1cm4gZnVsbCBzaXplLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09ICcnKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9LyR7dGhpcy5zaXplfWA7XG4gICAgfVxuXG4gICAgdGhpcy5oaWdoUmVzLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuaGlnaFJlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5oaWdoUmVzLnNyYztcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5oaWdoUmVzLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICAgIHRoaXMuaGlnaFJlcy5vbmVycm9yID0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmhpZ2hSZXNSZWFkeSkge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdibHVyLWluJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBpZiAodGhpcy5wbGF0Zm9ybVNlcnZpY2UucGxhdGZvcm1Ccm93c2VyKCkpIHtcbiAgICAvLyB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbENvbmZpZyB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgSUJhbm5lciB9IGZyb20gJy4uLy4uL3N0b3JlL21vZGVscy9iYW5uZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYmFubmVyOiBJQmFubmVyW10gPSBbXTtcblxuICBjYXJvdXNlbE9uZTogTmd1Q2Fyb3VzZWxDb25maWcgPSB7XG4gICAgZ3JpZDogeyB4czogMSwgc206IDEsIG1kOiAxLCBsZzogMSwgYWxsOiAwIH0sXG4gICAgc2xpZGU6IDEsXG4gICAgc3BlZWQ6IDQwMCxcbiAgICAvLyBpbnRlcnZhbDogNDAwMCxcbiAgICBwb2ludDoge1xuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbG9hZDogMixcbiAgICB0b3VjaDogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIGN1c3RvbTogJ2Jhbm5lcidcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LW5hdicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXYuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uYXYuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYXZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZW51SXRlbXM6IGFueVtdO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbGlzdEV4aXN0cyhpdGVtKTogYm9vbGVhbiB7XG4gICAgaWYgKGl0ZW0ubGlzdCAmJiBpdGVtLmxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBsaXN0RW1wdHkoaXRlbSk6IGJvb2xlYW4ge1xuICAgIGlmIChpdGVtLmxpc3QgJiYgaXRlbS5saXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9maXNocnkuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IE5ndUNhcm91c2VsTW9kdWxlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5U2VydmljZSB9IGZyb20gJy4vZmlzaHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlzaHJ5SW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmlzaHJ5LWltYWdlL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uYXYvbmF2LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTmd1Q2Fyb3VzZWxNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRmlzaHJ5Q29tcG9uZW50LCBGaXNocnlJbWFnZUNvbXBvbmVudCwgQ2Fyb3VzZWxDb21wb25lbnQsIE5hdkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtGaXNocnlDb21wb25lbnQsIEZpc2hyeUltYWdlQ29tcG9uZW50LCBDYXJvdXNlbENvbXBvbmVudCwgTmF2Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlNb2R1bGUge1xuICBkb21haW46IHN0cmluZztcbiAgc3RhdGljIGZvclJvb3QoZG9tYWluOiBzdHJpbmcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZpc2hyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGaXNocnlTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ2RvbWFpbicsXG4gICAgICAgICAgdXNlVmFsdWU6IGRvbWFpblxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiRmlzaHJ5QWN0aW9ucy5TRVQiLCJGaXNocnlBY3Rpb25zLlVQREFURSIsIkZpc2hyeUFjdGlvbnMuREVMRVRFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFDQyxnQkFBbUIsSUFBWSxFQUFTLE9BQWdDO1FBQXJELFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtLQUFLO0lBQzlFLGFBQUM7Q0FBQSxJQUFBOztBQUVE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