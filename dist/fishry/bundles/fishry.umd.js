(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('lodash'), require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/http'), require('@angular/platform-browser'), require('@angular/platform-browser/animations'), require('@angular/material'), require('@ngu/carousel')) :
    typeof define === 'function' && define.amd ? define('fishry', ['exports', 'rxjs/operators', 'lodash', '@angular/core', 'rxjs', '@angular/common', '@angular/http', '@angular/platform-browser', '@angular/platform-browser/animations', '@angular/material', '@ngu/carousel'], factory) :
    (factory((global.fishry = {}),global.rxjs.operators,global.lodash,global.ng.core,global.rxjs,global.ng.common,global.ng.http,global.ng.platformBrowser,global.ng.platformBrowser.animations,global.ng.material,global['@ngu/carousel']));
}(this, (function (exports,operators,lodash,i0,rxjs,common,i1,i3,animations,material,carousel) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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
        return operators.scan(function (state, action) {
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
                    next = lodash.omit(state, action.payload);
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
            this.actions = new rxjs.Subject();
            this._state$ = new rxjs.BehaviorSubject((this.initialState));
            // this.state$ = this._state$.asObservable();
            this.actions.pipe(reducer(), operators.shareReplay(1)).subscribe(function (state) { return _this._state$.next(state); });
            // Redux Dev Tools
            if (common.isPlatformBrowser(this.platformId)) ;
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
             */ function () {
                return this._state$.getValue();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FishryStore.prototype, "state$", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        FishryStore.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        /** @nocollapse */ FishryStore.ngInjectableDef = i0.defineInjectable({ factory: function FishryStore_Factory() { return new FishryStore(i0.inject(i0.PLATFORM_ID)); }, token: FishryStore, providedIn: "root" });
        return FishryStore;
    }());
    /** @type {?} */
    var select = function (path) {
        return rxjs.pipe(operators.map(function (state) { return lodash.get(state, path, null); }), operators.distinctUntilChanged(lodash.isEqual));
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var STATE_KEY = i3.makeStateKey('appState');
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
            this.appState = this.state.get(STATE_KEY, ( /** @type {?} */(null)));
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
                return this.fetchGeneralSettings(this.domain).pipe(operators.catchError(function (err) {
                    return rxjs.throwError(err);
                }), operators.tap(function (result) {
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
                    _this.state.set(STATE_KEY, ( /** @type {?} */(appState)));
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
                return response.pipe(operators.map(function (resp) { return resp.json().data; }), operators.share());
            };
        FishryService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        FishryService.ctorParameters = function () {
            return [
                { type: String, decorators: [{ type: i0.Inject, args: ['domain',] }] },
                { type: i1.Http },
                { type: FishryStore },
                { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] },
                { type: i3.TransferState }
            ];
        };
        /** @nocollapse */ FishryService.ngInjectableDef = i0.defineInjectable({ factory: function FishryService_Factory() { return new FishryService(i0.inject("domain"), i0.inject(i1.Http), i0.inject(FishryStore), i0.inject(i0.PLATFORM_ID), i0.inject(i3.TransferState)); }, token: FishryService, providedIn: "root" });
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
            { type: i0.Component, args: [{
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
                if (common.isPlatformBrowser(this.platformId)) {
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
            { type: i0.Component, args: [{
                        selector: 'fishry-image',
                        template: "<img #img [ngClass]=\"{'blur-in': enableLazyLoad}\" class=\"img-fluid\" />",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        FishryImageComponent.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        FishryImageComponent.propDecorators = {
            src: [{ type: i0.Input }],
            route: [{ type: i0.Input }],
            size: [{ type: i0.Input }],
            enableLazyLoad: [{ type: i0.Input }],
            img: [{ type: i0.ViewChild, args: ['img',] }]
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
            { type: i0.Component, args: [{
                        selector: 'fishry-carousel',
                        template: "<ngu-carousel #myCarousel [inputs]=\"carouselOne\" [dataSource]=\"banner\">\n  <!-- <ngu-item *ngFor=\"let banner of desktopBanner; let i = index\" (click)=\"routeTo(banner.link)\">\n    <img [src]=\"banner.image\" alt=\"\" class=\"img-fluid\">\n  </ngu-item>\n  <button NguCarouselPrev class='leftRs'>&lt;</button>\n  <button NguCarouselNext class='rightRs'>&gt;</button> -->\n\n\n  <ngu-tile *nguCarouselDef=\"let item; let j = index\">\n    <!-- <div class=\"tile\" [style.background]=\"'url(' + item + ')'\">\n      <h1>{{j}}</h1>\n    </div> -->\n    <img [src]=\"item.image\" alt=\"\" class=\"img-fluid\">\n  </ngu-tile>\n  <button NguCarouselPrev class=\"leftRs\">&lt;</button>\n  <button NguCarouselNext class=\"rightRs\">&gt;</button>\n  <!-- <ul class=\"myPoint\" NguCarouselPoint>\n    <li *ngFor=\"let j of myCarousel.pointNumbers; let j = index\" [class.active]=\"j==myCarousel.activePoint\" (click)=\"myCarousel.moveTo(j)\"\n      [style.background]=\"'url(' + images[j] + ')'\"></li>\n  </ul> -->\n</ngu-carousel>",
                        styles: [".leftRs{position:absolute;margin:auto;top:0;bottom:0;width:50px;height:50px;box-shadow:1px 2px 10px -1px rgba(0,0,0,.3);border-radius:999px;left:0}.rightRs{position:absolute;margin:auto;top:0;bottom:0;width:50px;height:50px;box-shadow:1px 2px 10px -1px rgba(0,0,0,.3);border-radius:999px;right:0}"]
                    }] }
        ];
        /** @nocollapse */
        CarouselComponent.ctorParameters = function () { return []; };
        CarouselComponent.propDecorators = {
            banner: [{ type: i0.Input }]
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
            { type: i0.Component, args: [{
                        selector: 'fishry-nav',
                        template: "<div class=\"navigation-block\" class=\"row\">\n  <div class=\"d-inline-block\" *ngFor=\"let item of menuItems\">\n    <button *ngIf=\"listExists(item)\" mat-button [matMenuTriggerFor]=\"subMenu1\">\n      {{item.name}}\n    </button>\n    <button *ngIf=\"listEmpty(item)\" mat-button>\n      {{item.name}}\n    </button>\n    <mat-menu #subMenu1=\"matMenu\">\n      <div *ngFor=\"let list of item.list\">\n        <button mat-menu-item *ngIf=\"listEmpty(list)\">{{list.name}}</button>\n        <button *ngIf=\"listExists(list)\" mat-menu-item [matMenuTriggerFor]=\"subMenu\">{{list.name}}</button>\n        <mat-menu #subMenu=\"matMenu\">\n          <button mat-menu-item *ngFor=\"let list of list.list\">{{list.name}}</button>\n        </mat-menu>\n      </div>\n    </mat-menu>\n  </div>\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        NavComponent.ctorParameters = function () { return []; };
        NavComponent.propDecorators = {
            menuItems: [{ type: i0.Input }]
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
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            animations.BrowserAnimationsModule,
                            material.MatMenuModule,
                            material.MatButtonModule,
                            carousel.NguCarouselModule
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

    exports.FishryService = FishryService;
    exports.FishryComponent = FishryComponent;
    exports.FishryModule = FishryModule;
    exports.FishryStore = FishryStore;
    exports.select = select;
    exports.Action = Action;
    exports.SET = SET;
    exports.UPDATE = UPDATE;
    exports.DELETE = DELETE;
    exports.setTest = setTest;
    exports.updateTest = updateTest;
    exports.deleteTest = deleteTest;
    exports.ɵb = CarouselComponent;
    exports.ɵa = FishryImageComponent;
    exports.ɵc = NavComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucy50cyIsIm5nOi8vZmlzaHJ5L2xpYi9zdG9yZS9yZWR1Y2Vycy9maXNocnkucmVkdWNlci50cyIsIm5nOi8vZmlzaHJ5L2xpYi9zdG9yZS9maXNocnkuc3RvcmUudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5LnNlcnZpY2UudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2NvbXBvbmVudHMvbmF2L25hdi5jb21wb25lbnQudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uIHtcblx0Y29uc3RydWN0b3IocHVibGljIHR5cGU6IHN0cmluZywgcHVibGljIHBheWxvYWQ/OiBQYXJ0aWFsPEFwcFN0YXRlTW9kZWw+KSB7IH1cbn1cblxuZXhwb3J0IGNvbnN0IFNFVCA9ICdTRVQnO1xuZXhwb3J0IGNvbnN0IFVQREFURSA9ICdVUERBVEUnO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuXG5leHBvcnQgY2xhc3Mgc2V0VGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnU0VUJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyB1cGRhdGVUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdVUERBVEUnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIGRlbGV0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ0RFTEVURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25zID0gc2V0VGVzdCB8IHVwZGF0ZVRlc3QgfCBkZWxldGVUZXN0OyIsImltcG9ydCB7IHNjYW4gfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuaW1wb3J0ICogYXMgRmlzaHJ5QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gXCJsb2Rhc2hcIjtcblxuZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSAoKSA9PlxuXHRzY2FuPGFueT4oKHN0YXRlOiBBcHBTdGF0ZU1vZGVsLCBhY3Rpb246IEZpc2hyeUFjdGlvbnMuQWN0aW9ucykgPT4ge1xuXHRcdGxldCBuZXh0O1xuXHRcdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5TRVQ6XG5cdFx0XHRcdG5leHQgPSBhY3Rpb24ucGF5bG9hZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpc2hyeUFjdGlvbnMuVVBEQVRFOlxuXHRcdFx0XHRuZXh0ID0geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpc2hyeUFjdGlvbnMuREVMRVRFOlxuXHRcdFx0XHRuZXh0ID0gb21pdChzdGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdG5leHQgPSBzdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdC8qIGlmIChzdGF0ZS5pc1BsYXRmb3JtQnJvd3Nlcikge1xuXHRcdFx0Y29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdHdpbi5kZXZUb29scy5zZW5kKGFjdGlvbi50eXBlLCBuZXh0KTtcblx0XHR9ICovXG5cblx0XHRyZXR1cm4gbmV4dDtcblx0fSwge30pOyIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIHBpcGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2NhbiwgbWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2Vycy9maXNocnkucmVkdWNlcic7XG5pbXBvcnQgeyBnZXQsIGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4vYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4vYWN0aW9ucy9maXNocnkuYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbi8vIGNvbnN0IHdpbiA9IHdpbmRvdyBhcyBhbnk7XG5cblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U3RvcmUge1xuXHQvLyBzdGF0ZSQ6IE9ic2VydmFibGU8YW55Pjtcblx0cHJpdmF0ZSBfc3RhdGUkOiBCZWhhdmlvclN1YmplY3Q8QXBwU3RhdGVNb2RlbD47XG5cdGFjdGlvbnM6IFN1YmplY3Q8QWN0aW9uPiA9IG5ldyBTdWJqZWN0KCk7XG5cblx0ZGV2VG9vbHM6IGFueTtcblx0aW5pdGlhbFN0YXRlOiBBcHBTdGF0ZU1vZGVsO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuXHQpIHtcblxuXHRcdHRoaXMuX3N0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoKHRoaXMuaW5pdGlhbFN0YXRlKSk7XG5cdFx0Ly8gdGhpcy5zdGF0ZSQgPSB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cblx0XHR0aGlzLmFjdGlvbnMucGlwZShcblx0XHRcdHJlZHVjZXIoKSxcblx0XHRcdHNoYXJlUmVwbGF5KDEpLFxuXHRcdCkuc3Vic2NyaWJlKChzdGF0ZSkgPT4gdGhpcy5fc3RhdGUkLm5leHQoc3RhdGUpKTtcblx0XHQvLyBSZWR1eCBEZXYgVG9vbHNcblx0XHRpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuXHRcdFx0Ly8gY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdC8vIHdpbi5kZXZUb29scyA9IHdpbi5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fLmNvbm5lY3QoKTtcblx0XHR9XG5cdH1cblxuXHRzZWxlY3QkKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUkLnBpcGUoc2VsZWN0KHBhdGgpKTtcblx0fVxuXG5cdHNlbGVjdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlJC5waXBlKHNlbGVjdChwYXRoKSkudG9Qcm9taXNlKClcblx0fVxuXG5cdGRpc3BhdGNoKGFjdGlvbjogQWN0aW9uKSB7XG5cdFx0dGhpcy5hY3Rpb25zLm5leHQoYWN0aW9uKTtcblx0fVxuXG5cdGdldCBzdGF0ZSgpOiBBcHBTdGF0ZU1vZGVsIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUkLmdldFZhbHVlKCk7XG5cdH1cblxuXHRnZXQgc3RhdGUkKCk6IE9ic2VydmFibGU8QXBwU3RhdGVNb2RlbD4ge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHRzZXRTdGF0ZShuZXh0U3RhdGU6IEFwcFN0YXRlTW9kZWwpOiB2b2lkIHtcblx0XHR0aGlzLl9zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IHBhdGggPT5cblx0cGlwZShcblx0XHRtYXAoc3RhdGUgPT4gZ2V0KHN0YXRlLCBwYXRoLCBudWxsKSksXG5cdFx0ZGlzdGluY3RVbnRpbENoYW5nZWQoaXNFcXVhbClcblx0KSIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpc2hyeVN0b3JlIH0gZnJvbSBcIi4vc3RvcmUvZmlzaHJ5LnN0b3JlXCI7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlLCBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL3N0b3JlL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgSUdlbmVyYWxTZXR0aW5ncywgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuL3N0b3JlL21vZGVscy9maXNocnkubW9kZWxcIjtcbi8vIGltcG9ydCB7IG1ha2VTdGF0ZUtleSwgVHJhbnNmZXJTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNmZXJTdGF0ZSwgbWFrZVN0YXRlS2V5IH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCAqIGFzIFJlZGlzIGZyb20gJ3JlZGlzJztcblxuY29uc3QgU1RBVEVfS0VZID0gbWFrZVN0YXRlS2V5KCdhcHBTdGF0ZScpO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U2VydmljZSB7XG5cbiAgYXBwU3RhdGU6IEFwcFN0YXRlTW9kZWwgPSB7XG4gICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgIGdlbmVyYWxTZXR0aW5nczogbnVsbCxcbiAgICB0aGVtZVNldHRpbmdzOiBudWxsLFxuICAgIG5hdmlnYXRpb246IG51bGwsXG4gICAgc3RvcmVTZXR0aW5nczogbnVsbCxcbiAgICBzdG9yZUlEOiBudWxsLFxuICAgIGRvbWFpbjogbnVsbCxcbiAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2RvbWFpbicpIHB1YmxpYyBkb21haW46IHN0cmluZyxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHAsXG4gICAgcHJpdmF0ZSBzdG9yZTogRmlzaHJ5U3RvcmUsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBzdGF0ZTogVHJhbnNmZXJTdGF0ZVxuICApIHtcbiAgICB0aGlzLmluaXREb21haW4oZG9tYWluKTtcbiAgICB0aGlzLmFwcFN0YXRlID0gdGhpcy5zdGF0ZS5nZXQoU1RBVEVfS0VZLCBudWxsIGFzIEFwcFN0YXRlTW9kZWwpO1xuICAgIGlmICghdGhpcy5hcHBTdGF0ZSkge1xuICAgICAgY29uc29sZS5sb2coJ2FwcFN0YXRlIG5vdCBzZXQnKTtcbiAgICAgIHRoaXMuaW5pdEdlbmVyYWxTZXR0aW5ncyhkb21haW4pLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnYXBwU3RhdGUgYWxyYWR5IHNldCcpO1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdTRVQnLCB7XG4gICAgICAgIGlzTG9hZGVkOiB0aGlzLmFwcFN0YXRlLmlzTG9hZGVkLFxuICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUuZ2VuZXJhbFNldHRpbmdzLFxuICAgICAgICB0aGVtZVNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLnRoZW1lU2V0dGluZ3MsXG4gICAgICAgIG5hdmlnYXRpb246IHRoaXMuYXBwU3RhdGUubmF2aWdhdGlvbixcbiAgICAgICAgc3RvcmVTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS5zdG9yZVNldHRpbmdzLFxuICAgICAgICBzdG9yZUlEOiB0aGlzLmFwcFN0YXRlLnN0b3JlSUQsXG4gICAgICAgIGRvbWFpbjogdGhpcy5hcHBTdGF0ZS5kb21haW4sXG4gICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICAgICAgfSkpO1xuICAgICAgY29uc29sZS5sb2coJ3RoZSBzdGF0ZScsIHRoaXMuc3RvcmUuc3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGluaXREb21haW4oZG9tYWluOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1NFVCcsIHsgZG9tYWluOiBkb21haW4gfSkpO1xuICB9XG5cbiAgaW5pdEdlbmVyYWxTZXR0aW5ncyhkb21haW46IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZldGNoR2VuZXJhbFNldHRpbmdzKHRoaXMuZG9tYWluKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVycilcbiAgICAgIH0pLFxuICAgICAgdGFwKChyZXN1bHQ6IElHZW5lcmFsU2V0dGluZ3MpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHJlc3VsdCk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBnZW5lcmFsU2V0dGluZ3M6IHJlc3VsdCB9KSk7XG4gICAgICAgIHRoaXMuaW5pdFRoZW1lU2V0dGluZ3MocmVzdWx0LnRoZW1lX3NldHRpbmdzKTtcbiAgICAgICAgdGhpcy5pbml0U3RvcmVJRChyZXN1bHQuc3RvcmVJRCk7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlU2V0dGluZ3MocmVzdWx0LnNldHRpbmdzKVxuICAgICAgICB0aGlzLmluaXROYXZpZ2F0aW9uKHJlc3VsdC5uYXZfZGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBpc0xvYWRlZDogdHJ1ZSB9KSk7XG4gICAgICAgIGxldCBhcHBTdGF0ZTogQXBwU3RhdGVNb2RlbCA9IHtcbiAgICAgICAgICBpc0xvYWRlZDogdGhpcy5zdG9yZS5zdGF0ZS5pc0xvYWRlZCxcbiAgICAgICAgICBnZW5lcmFsU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUuZ2VuZXJhbFNldHRpbmdzLFxuICAgICAgICAgIHRoZW1lU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUudGhlbWVTZXR0aW5ncyxcbiAgICAgICAgICBuYXZpZ2F0aW9uOiB0aGlzLnN0b3JlLnN0YXRlLm5hdmlnYXRpb24sXG4gICAgICAgICAgc3RvcmVTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS5zdG9yZVNldHRpbmdzLFxuICAgICAgICAgIHN0b3JlSUQ6IHRoaXMuc3RvcmUuc3RhdGUuc3RvcmVJRCxcbiAgICAgICAgICBkb21haW46IHRoaXMuc3RvcmUuc3RhdGUuZG9tYWluLFxuICAgICAgICAgIGlzUGxhdGZvcm1Ccm93c2VyOiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGUuc2V0KFNUQVRFX0tFWSwgYXBwU3RhdGUgYXMgQXBwU3RhdGVNb2RlbCk7XG4gICAgICB9LCBlcnJvciA9PiBjb25zb2xlLmVycm9yKCdlcnJvcicsIGVycm9yLm1lc3NhZ2UpXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgaW5pdFRoZW1lU2V0dGluZ3ModGhlbWVTZXR0aW5nczogYW55KSB7XG4gICAgdGhlbWVTZXR0aW5ncyA9IEpTT04ucGFyc2UodGhlbWVTZXR0aW5ncyk7XG4gICAgbGV0IG1haW5CYW5uZXIgPSB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXI7XG4gICAgbWFpbkJhbm5lciA9IE9iamVjdC5rZXlzKG1haW5CYW5uZXIpLm1hcChpID0+IG1haW5CYW5uZXJbaV0pO1xuICAgIHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lciA9IG1haW5CYW5uZXI7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHRoZW1lU2V0dGluZ3M6IHRoZW1lU2V0dGluZ3MgfSkpXG4gIH1cblxuICBmaXhUaGVtZVNldHRpbmdzRGF0YSh0aGVtZVNldHRpbmdzOiBhbnkpIHtcbiAgICBsZXQgbWFpbkJhbm5lciA9IHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lcjtcbiAgICBtYWluQmFubmVyID0gT2JqZWN0LmtleXMobWFpbkJhbm5lcikubWFwKGkgPT4gbWFpbkJhbm5lcltpXSk7XG4gICAgdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyID0gbWFpbkJhbm5lcjtcbiAgfVxuXG4gIGluaXRTdG9yZUlEKHN0b3JlSUQ6IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBzdG9yZUlEOiBzdG9yZUlEIH0pKVxuICB9XG5cbiAgaW5pdFN0b3JlU2V0dGluZ3Moc2V0dGluZ3M6IGFueSkge1xuICAgIHNldHRpbmdzID0gSlNPTi5wYXJzZShzZXR0aW5ncyk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHN0b3JlU2V0dGluZ3M6IHNldHRpbmdzIH0pKTtcbiAgfVxuXG4gIGluaXROYXZpZ2F0aW9uKG5hdmlnYXRpb246IGFueSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBuYXZpZ2F0aW9uOiBuYXZpZ2F0aW9uIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgZmV0Y2hHZW5lcmFsU2V0dGluZ3MoYXBwRG9tYWluPzogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5odHRwLmdldChgaHR0cHM6Ly9maXNocnktc3RvcmVmcm9udC1hcGlzLXN0Zy5henVyZXdlYnNpdGVzLm5ldC9nZXQtc3RvcmUtaW5mbz9kb21haW49JHthcHBEb21haW59YCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnBpcGUoXG4gICAgICBtYXAocmVzcCA9PiByZXNwLmpzb24oKS5kYXRhKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuICB9XG59XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1maXNocnknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgZmlzaHJ5IHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWltYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeUltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcm91dGU6IHN0cmluZyA9ICdwcm9kdWN0JztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGVuYWJsZUxhenlMb2FkOiBib29sZWFuID0gdHJ1ZTtcblxuICBAVmlld0NoaWxkKCdpbWcnKSBpbWc6IEVsZW1lbnRSZWY7XG4gIGhpZ2hSZXM6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGhpZ2hSZXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBjZG46IHN0cmluZyA9IGVudmlyb25tZW50LmNkbjtcbiAgY2RuOiBzdHJpbmcgPSAnaHR0cHM6Ly9maXNocnktaW1hZ2UuYXp1cmVlZGdlLm5ldC8nO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5oaWdoUmVzID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmFjdGl2ZUxvYWQoKTtcblxuICAgICAgaWYgKHRoaXMuZW5hYmxlTGF6eUxvYWQpIHtcbiAgICAgICAgdGhpcy5sYXp5TG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFjdGl2ZUxvYWQoKSB7XG4gICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9uZXJyb3IgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZUxhenlMb2FkICYmIHRoaXMuc2l6ZSAhPT0gJ3h4eHMnKSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBlbmFibGVkLCByZXR1cm4geHhzLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30veHhzYDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBkaXNhYmxlZCwgYW5kIHNpemUgaXMgbWVudGlvbmVkLCByZXR1cm4gc2l6ZS5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9LyR7dGhpcy5zaXplfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBsYXp5IGxvYWRpbmcgaXMgZGlzYWJsZWQgYW5kIHNpemUgaXMgbm90IG1lbnRpb25lZCwgcmV0dXJuIGZ1bGwgc2l6ZS5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsYXp5TG9hZCgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAnJykge1xuICAgICAgdGhpcy5oaWdoUmVzLnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZ2hSZXMuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS8ke3RoaXMuc2l6ZX1gO1xuICAgIH1cblxuICAgIHRoaXMuaGlnaFJlcy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmhpZ2hSZXNSZWFkeSA9IHRydWU7XG4gICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaGlnaFJlcy5zcmM7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgICB0aGlzLmhpZ2hSZXMub25lcnJvciA9IG51bGw7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5oaWdoUmVzUmVhZHkpIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYmx1ci1pbicpO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gaWYgKHRoaXMucGxhdGZvcm1TZXJ2aWNlLnBsYXRmb3JtQnJvd3NlcigpKSB7XG4gICAgLy8gfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxDb25maWcgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IElCYW5uZXIgfSBmcm9tICcuLi8uLi9zdG9yZS9tb2RlbHMvYmFubmVyLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGJhbm5lcjogSUJhbm5lcltdID0gW107XG5cbiAgY2Fyb3VzZWxPbmU6IE5ndUNhcm91c2VsQ29uZmlnID0ge1xuICAgIGdyaWQ6IHsgeHM6IDEsIHNtOiAxLCBtZDogMSwgbGc6IDEsIGFsbDogMCB9LFxuICAgIHNsaWRlOiAxLFxuICAgIHNwZWVkOiA0MDAsXG4gICAgLy8gaW50ZXJ2YWw6IDQwMDAsXG4gICAgcG9pbnQ6IHtcbiAgICAgIHZpc2libGU6IHRydWVcbiAgICB9LFxuICAgIGxvYWQ6IDIsXG4gICAgdG91Y2g6IHRydWUsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBjdXN0b206ICdiYW5uZXInXG4gIH1cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1uYXYnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmF2LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgbWVudUl0ZW1zOiBhbnlbXTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGxpc3RFeGlzdHMoaXRlbSk6IGJvb2xlYW4ge1xuICAgIGlmIChpdGVtLmxpc3QgJiYgaXRlbS5saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbGlzdEVtcHR5KGl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAoaXRlbS5saXN0ICYmIGl0ZW0ubGlzdC5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpc2hyeUNvbXBvbmVudCB9IGZyb20gJy4vZmlzaHJ5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbE1vZHVsZSB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb3JlJztcbmltcG9ydCB7IEZpc2hyeVNlcnZpY2UgfSBmcm9tICcuL2Zpc2hyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpc2hyeUltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXZDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbmF2L25hdi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE5ndUNhcm91c2VsTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0Zpc2hyeUNvbXBvbmVudCwgRmlzaHJ5SW1hZ2VDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50LCBOYXZDb21wb25lbnRdLFxuICBleHBvcnRzOiBbRmlzaHJ5Q29tcG9uZW50LCBGaXNocnlJbWFnZUNvbXBvbmVudCwgQ2Fyb3VzZWxDb21wb25lbnQsIE5hdkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5TW9kdWxlIHtcbiAgZG9tYWluOiBzdHJpbmc7XG4gIHN0YXRpYyBmb3JSb290KGRvbWFpbjogc3RyaW5nKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBGaXNocnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRmlzaHJ5U2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6ICdkb21haW4nLFxuICAgICAgICAgIHVzZVZhbHVlOiBkb21haW5cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbInNjYW4iLCJGaXNocnlBY3Rpb25zLlNFVCIsIkZpc2hyeUFjdGlvbnMuVVBEQVRFIiwiRmlzaHJ5QWN0aW9ucy5ERUxFVEUiLCJvbWl0IiwiU3ViamVjdCIsIkJlaGF2aW9yU3ViamVjdCIsInNoYXJlUmVwbGF5IiwiaXNQbGF0Zm9ybUJyb3dzZXIiLCJJbmplY3RhYmxlIiwiSW5qZWN0IiwiUExBVEZPUk1fSUQiLCJwaXBlIiwibWFwIiwiZ2V0IiwiZGlzdGluY3RVbnRpbENoYW5nZWQiLCJpc0VxdWFsIiwibWFrZVN0YXRlS2V5IiwiY2F0Y2hFcnJvciIsInRocm93RXJyb3IiLCJ0YXAiLCJzaGFyZSIsIkh0dHAiLCJUcmFuc2ZlclN0YXRlIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJWaWV3Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkJyb3dzZXJBbmltYXRpb25zTW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk5ndUNhcm91c2VsTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQWVPLElBQUksUUFBUSxHQUFHO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSyxJQUFJLENBQUMs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