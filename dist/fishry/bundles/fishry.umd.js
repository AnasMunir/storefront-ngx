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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucy50cyIsIm5nOi8vZmlzaHJ5L2xpYi9zdG9yZS9yZWR1Y2Vycy9maXNocnkucmVkdWNlci50cyIsIm5nOi8vZmlzaHJ5L2xpYi9zdG9yZS9maXNocnkuc3RvcmUudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5LnNlcnZpY2UudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2NvbXBvbmVudHMvbmF2L25hdi5jb21wb25lbnQudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uIHtcblx0Y29uc3RydWN0b3IocHVibGljIHR5cGU6IHN0cmluZywgcHVibGljIHBheWxvYWQ/OiBQYXJ0aWFsPEFwcFN0YXRlTW9kZWw+KSB7IH1cbn1cblxuZXhwb3J0IGNvbnN0IFNFVCA9ICdTRVQnO1xuZXhwb3J0IGNvbnN0IFVQREFURSA9ICdVUERBVEUnO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuXG5leHBvcnQgY2xhc3Mgc2V0VGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnU0VUJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyB1cGRhdGVUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdVUERBVEUnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIGRlbGV0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ0RFTEVURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25zID0gc2V0VGVzdCB8IHVwZGF0ZVRlc3QgfCBkZWxldGVUZXN0OyIsImltcG9ydCB7IHNjYW4gfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuaW1wb3J0ICogYXMgRmlzaHJ5QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gXCJsb2Rhc2hcIjtcblxuZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSAoKSA9PlxuXHRzY2FuPGFueT4oKHN0YXRlOiBBcHBTdGF0ZU1vZGVsLCBhY3Rpb246IEZpc2hyeUFjdGlvbnMuQWN0aW9ucykgPT4ge1xuXHRcdGxldCBuZXh0O1xuXHRcdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5TRVQ6XG5cdFx0XHRcdG5leHQgPSBhY3Rpb24ucGF5bG9hZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpc2hyeUFjdGlvbnMuVVBEQVRFOlxuXHRcdFx0XHRuZXh0ID0geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpc2hyeUFjdGlvbnMuREVMRVRFOlxuXHRcdFx0XHRuZXh0ID0gb21pdChzdGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdG5leHQgPSBzdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdC8qIGlmIChzdGF0ZS5pc1BsYXRmb3JtQnJvd3Nlcikge1xuXHRcdFx0Y29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdHdpbi5kZXZUb29scy5zZW5kKGFjdGlvbi50eXBlLCBuZXh0KTtcblx0XHR9ICovXG5cblx0XHRyZXR1cm4gbmV4dDtcblx0fSwge30pOyIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIHBpcGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2NhbiwgbWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2Vycy9maXNocnkucmVkdWNlcic7XG5pbXBvcnQgeyBnZXQsIGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4vYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4vYWN0aW9ucy9maXNocnkuYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbi8vIGNvbnN0IHdpbiA9IHdpbmRvdyBhcyBhbnk7XG5cblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U3RvcmUge1xuXHQvLyBzdGF0ZSQ6IE9ic2VydmFibGU8YW55Pjtcblx0cHJpdmF0ZSBfc3RhdGUkOiBCZWhhdmlvclN1YmplY3Q8QXBwU3RhdGVNb2RlbD47XG5cdGFjdGlvbnM6IFN1YmplY3Q8QWN0aW9uPiA9IG5ldyBTdWJqZWN0KCk7XG5cblx0ZGV2VG9vbHM6IGFueTtcblx0aW5pdGlhbFN0YXRlOiBBcHBTdGF0ZU1vZGVsO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuXHQpIHtcblxuXHRcdHRoaXMuX3N0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoKHRoaXMuaW5pdGlhbFN0YXRlKSk7XG5cdFx0Ly8gdGhpcy5zdGF0ZSQgPSB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cblx0XHR0aGlzLmFjdGlvbnMucGlwZShcblx0XHRcdHJlZHVjZXIoKSxcblx0XHRcdHNoYXJlUmVwbGF5KDEpLFxuXHRcdCkuc3Vic2NyaWJlKChzdGF0ZSkgPT4gdGhpcy5fc3RhdGUkLm5leHQoc3RhdGUpKTtcblx0XHQvLyBSZWR1eCBEZXYgVG9vbHNcblx0XHRpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuXHRcdFx0Ly8gY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdC8vIHdpbi5kZXZUb29scyA9IHdpbi5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fLmNvbm5lY3QoKTtcblx0XHR9XG5cdH1cblxuXHRzZWxlY3QkKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUkLnBpcGUoc2VsZWN0KHBhdGgpKTtcblx0fVxuXG5cdHNlbGVjdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlJC5waXBlKHNlbGVjdChwYXRoKSkudG9Qcm9taXNlKClcblx0fVxuXG5cdGRpc3BhdGNoKGFjdGlvbjogQWN0aW9uKSB7XG5cdFx0dGhpcy5hY3Rpb25zLm5leHQoYWN0aW9uKTtcblx0fVxuXG5cdGdldCBzdGF0ZSgpOiBBcHBTdGF0ZU1vZGVsIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUkLmdldFZhbHVlKCk7XG5cdH1cblxuXHRnZXQgc3RhdGUkKCk6IE9ic2VydmFibGU8QXBwU3RhdGVNb2RlbD4ge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHRzZXRTdGF0ZShuZXh0U3RhdGU6IEFwcFN0YXRlTW9kZWwpOiB2b2lkIHtcblx0XHR0aGlzLl9zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IHBhdGggPT5cblx0cGlwZShcblx0XHRtYXAoc3RhdGUgPT4gZ2V0KHN0YXRlLCBwYXRoLCBudWxsKSksXG5cdFx0ZGlzdGluY3RVbnRpbENoYW5nZWQoaXNFcXVhbClcblx0KSIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpc2hyeVN0b3JlIH0gZnJvbSBcIi4vc3RvcmUvZmlzaHJ5LnN0b3JlXCI7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlLCBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL3N0b3JlL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgSUdlbmVyYWxTZXR0aW5ncywgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuL3N0b3JlL21vZGVscy9maXNocnkubW9kZWxcIjtcbi8vIGltcG9ydCB7IG1ha2VTdGF0ZUtleSwgVHJhbnNmZXJTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNmZXJTdGF0ZSwgbWFrZVN0YXRlS2V5IH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmNvbnN0IFNUQVRFX0tFWSA9IG1ha2VTdGF0ZUtleSgnYXBwU3RhdGUnKTtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeVNlcnZpY2Uge1xuXG4gIGFwcFN0YXRlOiBBcHBTdGF0ZU1vZGVsID0ge1xuICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICBnZW5lcmFsU2V0dGluZ3M6IG51bGwsXG4gICAgdGhlbWVTZXR0aW5nczogbnVsbCxcbiAgICBuYXZpZ2F0aW9uOiBudWxsLFxuICAgIHN0b3JlU2V0dGluZ3M6IG51bGwsXG4gICAgc3RvcmVJRDogbnVsbCxcbiAgICBkb21haW46IG51bGwsXG4gICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdkb21haW4nKSBwdWJsaWMgZG9tYWluOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwLFxuICAgIHByaXZhdGUgc3RvcmU6IEZpc2hyeVN0b3JlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgc3RhdGU6IFRyYW5zZmVyU3RhdGVcbiAgKSB7XG4gICAgdGhpcy5pbml0RG9tYWluKGRvbWFpbik7XG4gICAgdGhpcy5hcHBTdGF0ZSA9IHRoaXMuc3RhdGUuZ2V0KFNUQVRFX0tFWSwgbnVsbCBhcyBBcHBTdGF0ZU1vZGVsKTtcbiAgICBpZiAoIXRoaXMuYXBwU3RhdGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBTdGF0ZSBub3Qgc2V0Jyk7XG4gICAgICB0aGlzLmluaXRHZW5lcmFsU2V0dGluZ3MoZG9tYWluKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ2FwcFN0YXRlIGFscmFkeSBzZXQnKTtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignU0VUJywge1xuICAgICAgICBpc0xvYWRlZDogdGhpcy5hcHBTdGF0ZS5pc0xvYWRlZCxcbiAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLmdlbmVyYWxTZXR0aW5ncyxcbiAgICAgICAgdGhlbWVTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS50aGVtZVNldHRpbmdzLFxuICAgICAgICBuYXZpZ2F0aW9uOiB0aGlzLmFwcFN0YXRlLm5hdmlnYXRpb24sXG4gICAgICAgIHN0b3JlU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUuc3RvcmVTZXR0aW5ncyxcbiAgICAgICAgc3RvcmVJRDogdGhpcy5hcHBTdGF0ZS5zdG9yZUlELFxuICAgICAgICBkb21haW46IHRoaXMuYXBwU3RhdGUuZG9tYWluLFxuICAgICAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgICAgIH0pKTtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGUgc3RhdGUnLHRoaXMuc3RvcmUuc3RhdGUpOyAgICAgXG4gICAgfVxuICB9XG5cbiAgaW5pdERvbWFpbihkb21haW46IHN0cmluZykge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignU0VUJywgeyBkb21haW46IGRvbWFpbiB9KSk7XG4gIH1cblxuICBpbml0R2VuZXJhbFNldHRpbmdzKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hHZW5lcmFsU2V0dGluZ3ModGhpcy5kb21haW4pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKVxuICAgICAgfSksXG4gICAgICB0YXAoKHJlc3VsdDogSUdlbmVyYWxTZXR0aW5ncykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVzdWx0JywgcmVzdWx0KTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IGdlbmVyYWxTZXR0aW5nczogcmVzdWx0IH0pKTtcbiAgICAgICAgdGhpcy5pbml0VGhlbWVTZXR0aW5ncyhyZXN1bHQudGhlbWVfc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLmluaXRTdG9yZUlEKHJlc3VsdC5zdG9yZUlEKTtcbiAgICAgICAgdGhpcy5pbml0U3RvcmVTZXR0aW5ncyhyZXN1bHQuc2V0dGluZ3MpXG4gICAgICAgIHRoaXMuaW5pdE5hdmlnYXRpb24ocmVzdWx0Lm5hdl9kYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IGlzTG9hZGVkOiB0cnVlIH0pKTtcbiAgICAgICAgbGV0IGFwcFN0YXRlOiBBcHBTdGF0ZU1vZGVsID0ge1xuICAgICAgICAgIGlzTG9hZGVkOiB0aGlzLnN0b3JlLnN0YXRlLmlzTG9hZGVkLFxuICAgICAgICAgIGdlbmVyYWxTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS5nZW5lcmFsU2V0dGluZ3MsXG4gICAgICAgICAgdGhlbWVTZXR0aW5nczogdGhpcy5zdG9yZS5zdGF0ZS50aGVtZVNldHRpbmdzLFxuICAgICAgICAgIG5hdmlnYXRpb246IHRoaXMuc3RvcmUuc3RhdGUubmF2aWdhdGlvbixcbiAgICAgICAgICBzdG9yZVNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLnN0b3JlU2V0dGluZ3MsXG4gICAgICAgICAgc3RvcmVJRDogdGhpcy5zdG9yZS5zdGF0ZS5zdG9yZUlELFxuICAgICAgICAgIGRvbWFpbjogdGhpcy5zdG9yZS5zdGF0ZS5kb21haW4sXG4gICAgICAgICAgaXNQbGF0Zm9ybUJyb3dzZXI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZS5zZXQoU1RBVEVfS0VZLCBhcHBTdGF0ZSBhcyBBcHBTdGF0ZU1vZGVsKTtcbiAgICAgIH0sIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ2Vycm9yJywgZXJyb3IubWVzc2FnZSlcbiAgICAgIClcbiAgICApXG4gIH1cblxuICBpbml0VGhlbWVTZXR0aW5ncyh0aGVtZVNldHRpbmdzOiBhbnkpIHtcbiAgICB0aGVtZVNldHRpbmdzID0gSlNPTi5wYXJzZSh0aGVtZVNldHRpbmdzKTtcbiAgICBsZXQgbWFpbkJhbm5lciA9IHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lcjtcbiAgICBtYWluQmFubmVyID0gT2JqZWN0LmtleXMobWFpbkJhbm5lcikubWFwKGkgPT4gbWFpbkJhbm5lcltpXSk7XG4gICAgdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyID0gbWFpbkJhbm5lcjtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgdGhlbWVTZXR0aW5nczogdGhlbWVTZXR0aW5ncyB9KSlcbiAgfVxuXG4gIGZpeFRoZW1lU2V0dGluZ3NEYXRhKHRoZW1lU2V0dGluZ3M6IGFueSkge1xuICAgIGxldCBtYWluQmFubmVyID0gdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyO1xuICAgIG1haW5CYW5uZXIgPSBPYmplY3Qua2V5cyhtYWluQmFubmVyKS5tYXAoaSA9PiBtYWluQmFubmVyW2ldKTtcbiAgICB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXIgPSBtYWluQmFubmVyO1xuICB9XG5cbiAgaW5pdFN0b3JlSUQoc3RvcmVJRDogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IHN0b3JlSUQ6IHN0b3JlSUQgfSkpXG4gIH1cblxuICBpbml0U3RvcmVTZXR0aW5ncyhzZXR0aW5nczogYW55KSB7XG4gICAgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHNldHRpbmdzKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgc3RvcmVTZXR0aW5nczogc2V0dGluZ3MgfSkpO1xuICB9XG5cbiAgaW5pdE5hdmlnYXRpb24obmF2aWdhdGlvbjogYW55KSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdVUERBVEUnLCB7IG5hdmlnYXRpb246IG5hdmlnYXRpb24gfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBmZXRjaEdlbmVyYWxTZXR0aW5ncyhhcHBEb21haW4/OiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLmh0dHAuZ2V0KGBodHRwczovL2Zpc2hyeS1zdG9yZWZyb250LWFwaXMtc3RnLmF6dXJld2Vic2l0ZXMubmV0L2dldC1zdG9yZS1pbmZvP2RvbWFpbj0ke2FwcERvbWFpbn1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UucGlwZShcbiAgICAgIG1hcChyZXNwID0+IHJlc3AuanNvbigpLmRhdGEpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG4gIH1cbn1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWZpc2hyeScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBmaXNocnkgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktaW1hZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5SW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBzcmM6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJ3Byb2R1Y3QnO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgZW5hYmxlTGF6eUxvYWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltZycpIGltZzogRWxlbWVudFJlZjtcbiAgaGlnaFJlczogSFRNTEltYWdlRWxlbWVudDtcbiAgaGlnaFJlc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gIC8vIGNkbjogc3RyaW5nID0gZW52aXJvbm1lbnQuY2RuO1xuICBjZG46IHN0cmluZyA9ICdodHRwczovL2Zpc2hyeS1pbWFnZS5henVyZWVkZ2UubmV0Lyc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuYWN0aXZlTG9hZCgpO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVMYXp5TG9hZCkge1xuICAgICAgICB0aGlzLmxhenlMb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlTG9hZCgpIHtcbiAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25lcnJvciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlTGF6eUxvYWQgJiYgdGhpcy5zaXplICE9PSAneHh4cycpIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGVuYWJsZWQsIHJldHVybiB4eHMuXG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS94eHNgO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGRpc2FibGVkLCBhbmQgc2l6ZSBpcyBtZW50aW9uZWQsIHJldHVybiBzaXplLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30vJHt0aGlzLnNpemV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBkaXNhYmxlZCBhbmQgc2l6ZSBpcyBub3QgbWVudGlvbmVkLCByZXR1cm4gZnVsbCBzaXplLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09ICcnKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9LyR7dGhpcy5zaXplfWA7XG4gICAgfVxuXG4gICAgdGhpcy5oaWdoUmVzLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuaGlnaFJlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5oaWdoUmVzLnNyYztcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5oaWdoUmVzLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICAgIHRoaXMuaGlnaFJlcy5vbmVycm9yID0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmhpZ2hSZXNSZWFkeSkge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdibHVyLWluJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBpZiAodGhpcy5wbGF0Zm9ybVNlcnZpY2UucGxhdGZvcm1Ccm93c2VyKCkpIHtcbiAgICAvLyB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbENvbmZpZyB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgSUJhbm5lciB9IGZyb20gJy4uLy4uL3N0b3JlL21vZGVscy9iYW5uZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYmFubmVyOiBJQmFubmVyW10gPSBbXTtcblxuICBjYXJvdXNlbE9uZTogTmd1Q2Fyb3VzZWxDb25maWcgPSB7XG4gICAgZ3JpZDogeyB4czogMSwgc206IDEsIG1kOiAxLCBsZzogMSwgYWxsOiAwIH0sXG4gICAgc2xpZGU6IDEsXG4gICAgc3BlZWQ6IDQwMCxcbiAgICAvLyBpbnRlcnZhbDogNDAwMCxcbiAgICBwb2ludDoge1xuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbG9hZDogMixcbiAgICB0b3VjaDogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIGN1c3RvbTogJ2Jhbm5lcidcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LW5hdicsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXYuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uYXYuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOYXZDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZW51SXRlbXM6IGFueVtdO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbGlzdEV4aXN0cyhpdGVtKTogYm9vbGVhbiB7XG4gICAgaWYgKGl0ZW0ubGlzdCAmJiBpdGVtLmxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBsaXN0RW1wdHkoaXRlbSk6IGJvb2xlYW4ge1xuICAgIGlmIChpdGVtLmxpc3QgJiYgaXRlbS5saXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5Q29tcG9uZW50IH0gZnJvbSAnLi9maXNocnkuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IE5ndUNhcm91c2VsTW9kdWxlIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvcmUnO1xuaW1wb3J0IHsgRmlzaHJ5U2VydmljZSB9IGZyb20gJy4vZmlzaHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlzaHJ5SW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmlzaHJ5LWltYWdlL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE5hdkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9uYXYvbmF2LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTmd1Q2Fyb3VzZWxNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbRmlzaHJ5Q29tcG9uZW50LCBGaXNocnlJbWFnZUNvbXBvbmVudCwgQ2Fyb3VzZWxDb21wb25lbnQsIE5hdkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtGaXNocnlDb21wb25lbnQsIEZpc2hyeUltYWdlQ29tcG9uZW50LCBDYXJvdXNlbENvbXBvbmVudCwgTmF2Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlNb2R1bGUge1xuICBkb21haW46IHN0cmluZztcbiAgc3RhdGljIGZvclJvb3QoZG9tYWluOiBzdHJpbmcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEZpc2hyeU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGaXNocnlTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogJ2RvbWFpbicsXG4gICAgICAgICAgdXNlVmFsdWU6IGRvbWFpblxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsic2NhbiIsIkZpc2hyeUFjdGlvbnMuU0VUIiwiRmlzaHJ5QWN0aW9ucy5VUERBVEUiLCJGaXNocnlBY3Rpb25zLkRFTEVURSIsIm9taXQiLCJTdWJqZWN0IiwiQmVoYXZpb3JTdWJqZWN0Iiwic2hhcmVSZXBsYXkiLCJpc1BsYXRmb3JtQnJvd3NlciIsIkluamVjdGFibGUiLCJJbmplY3QiLCJQTEFURk9STV9JRCIsInBpcGUiLCJtYXAiLCJnZXQiLCJkaXN0aW5jdFVudGlsQ2hhbmdlZCIsImlzRXF1YWwiLCJtYWtlU3RhdGVLZXkiLCJjYXRjaEVycm9yIiwidGhyb3dFcnJvciIsInRhcCIsInNoYXJlIiwiSHR0cCIsIlRyYW5zZmVyU3RhdGUiLCJDb21wb25lbnQiLCJJbnB1dCIsIlZpZXdDaGlsZCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJNYXRNZW51TW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTmd1Q2Fyb3VzZWxNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBZU8sSUFBSSxRQUFRLEdBQUc7UUFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxH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