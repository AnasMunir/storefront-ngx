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
            this.redisUrl = 'https://fishry-storefront-stg-ngx.azurewebsites.net';
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
                var response = this.http.get(this.redisUrl + "/get-store-info?domain=" + appDomain);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL2Zpc2hyeS9saWIvc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucy50cyIsIm5nOi8vZmlzaHJ5L2xpYi9zdG9yZS9yZWR1Y2Vycy9maXNocnkucmVkdWNlci50cyIsIm5nOi8vZmlzaHJ5L2xpYi9zdG9yZS9maXNocnkuc3RvcmUudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5LnNlcnZpY2UudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5LmNvbXBvbmVudC50cyIsIm5nOi8vZmlzaHJ5L2xpYi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9maXNocnkvbGliL2NvbXBvbmVudHMvbmF2L25hdi5jb21wb25lbnQudHMiLCJuZzovL2Zpc2hyeS9saWIvZmlzaHJ5Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uIHtcblx0Y29uc3RydWN0b3IocHVibGljIHR5cGU6IHN0cmluZywgcHVibGljIHBheWxvYWQ/OiBQYXJ0aWFsPEFwcFN0YXRlTW9kZWw+KSB7IH1cbn1cblxuZXhwb3J0IGNvbnN0IFNFVCA9ICdTRVQnO1xuZXhwb3J0IGNvbnN0IFVQREFURSA9ICdVUERBVEUnO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuXG5leHBvcnQgY2xhc3Mgc2V0VGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnU0VUJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyB1cGRhdGVUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdVUERBVEUnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIGRlbGV0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ0RFTEVURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25zID0gc2V0VGVzdCB8IHVwZGF0ZVRlc3QgfCBkZWxldGVUZXN0OyIsImltcG9ydCB7IHNjYW4gfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuaW1wb3J0ICogYXMgRmlzaHJ5QWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL2Zpc2hyeS5hY3Rpb25zJztcbmltcG9ydCB7IEFwcFN0YXRlTW9kZWwgfSBmcm9tIFwiLi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gXCJsb2Rhc2hcIjtcblxuZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSAoKSA9PlxuXHRzY2FuPGFueT4oKHN0YXRlOiBBcHBTdGF0ZU1vZGVsLCBhY3Rpb246IEZpc2hyeUFjdGlvbnMuQWN0aW9ucykgPT4ge1xuXHRcdGxldCBuZXh0O1xuXHRcdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5TRVQ6XG5cdFx0XHRcdG5leHQgPSBhY3Rpb24ucGF5bG9hZDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpc2hyeUFjdGlvbnMuVVBEQVRFOlxuXHRcdFx0XHRuZXh0ID0geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpc2hyeUFjdGlvbnMuREVMRVRFOlxuXHRcdFx0XHRuZXh0ID0gb21pdChzdGF0ZSwgYWN0aW9uLnBheWxvYWQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdG5leHQgPSBzdGF0ZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdC8qIGlmIChzdGF0ZS5pc1BsYXRmb3JtQnJvd3Nlcikge1xuXHRcdFx0Y29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdHdpbi5kZXZUb29scy5zZW5kKGFjdGlvbi50eXBlLCBuZXh0KTtcblx0XHR9ICovXG5cblx0XHRyZXR1cm4gbmV4dDtcblx0fSwge30pOyIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIHBpcGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2NhbiwgbWFwLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyByZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2Vycy9maXNocnkucmVkdWNlcic7XG5pbXBvcnQgeyBnZXQsIGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4vYWN0aW9ucy9maXNocnkuYWN0aW9ucyc7XG5pbXBvcnQgeyBBcHBTdGF0ZU1vZGVsIH0gZnJvbSBcIi4vbW9kZWxzL2Zpc2hyeS5tb2RlbFwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIi4vYWN0aW9ucy9maXNocnkuYWN0aW9uc1wiO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbi8vIGNvbnN0IHdpbiA9IHdpbmRvdyBhcyBhbnk7XG5cblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U3RvcmUge1xuXHQvLyBzdGF0ZSQ6IE9ic2VydmFibGU8YW55Pjtcblx0cHJpdmF0ZSBfc3RhdGUkOiBCZWhhdmlvclN1YmplY3Q8QXBwU3RhdGVNb2RlbD47XG5cdGFjdGlvbnM6IFN1YmplY3Q8QWN0aW9uPiA9IG5ldyBTdWJqZWN0KCk7XG5cblx0ZGV2VG9vbHM6IGFueTtcblx0aW5pdGlhbFN0YXRlOiBBcHBTdGF0ZU1vZGVsO1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuXHQpIHtcblxuXHRcdHRoaXMuX3N0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoKHRoaXMuaW5pdGlhbFN0YXRlKSk7XG5cdFx0Ly8gdGhpcy5zdGF0ZSQgPSB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cblx0XHR0aGlzLmFjdGlvbnMucGlwZShcblx0XHRcdHJlZHVjZXIoKSxcblx0XHRcdHNoYXJlUmVwbGF5KDEpLFxuXHRcdCkuc3Vic2NyaWJlKChzdGF0ZSkgPT4gdGhpcy5fc3RhdGUkLm5leHQoc3RhdGUpKTtcblx0XHQvLyBSZWR1eCBEZXYgVG9vbHNcblx0XHRpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuXHRcdFx0Ly8gY29uc3Qgd2luID0gd2luZG93IGFzIGFueTtcblx0XHRcdC8vIHdpbi5kZXZUb29scyA9IHdpbi5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fLmNvbm5lY3QoKTtcblx0XHR9XG5cdH1cblxuXHRzZWxlY3QkKHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUkLnBpcGUoc2VsZWN0KHBhdGgpKTtcblx0fVxuXG5cdHNlbGVjdChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLnN0YXRlJC5waXBlKHNlbGVjdChwYXRoKSkudG9Qcm9taXNlKClcblx0fVxuXG5cdGRpc3BhdGNoKGFjdGlvbjogQWN0aW9uKSB7XG5cdFx0dGhpcy5hY3Rpb25zLm5leHQoYWN0aW9uKTtcblx0fVxuXG5cdGdldCBzdGF0ZSgpOiBBcHBTdGF0ZU1vZGVsIHtcblx0XHRyZXR1cm4gdGhpcy5fc3RhdGUkLmdldFZhbHVlKCk7XG5cdH1cblxuXHRnZXQgc3RhdGUkKCk6IE9ic2VydmFibGU8QXBwU3RhdGVNb2RlbD4ge1xuXHRcdHJldHVybiB0aGlzLl9zdGF0ZSQuYXNPYnNlcnZhYmxlKCk7XG5cdH1cblxuXHRzZXRTdGF0ZShuZXh0U3RhdGU6IEFwcFN0YXRlTW9kZWwpOiB2b2lkIHtcblx0XHR0aGlzLl9zdGF0ZSQubmV4dChuZXh0U3RhdGUpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IHBhdGggPT5cblx0cGlwZShcblx0XHRtYXAoc3RhdGUgPT4gZ2V0KHN0YXRlLCBwYXRoLCBudWxsKSksXG5cdFx0ZGlzdGluY3RVbnRpbENoYW5nZWQoaXNFcXVhbClcblx0KSIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpc2hyeVN0b3JlIH0gZnJvbSBcIi4vc3RvcmUvZmlzaHJ5LnN0b3JlXCI7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlLCBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL3N0b3JlL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgSUdlbmVyYWxTZXR0aW5ncywgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuL3N0b3JlL21vZGVscy9maXNocnkubW9kZWxcIjtcbi8vIGltcG9ydCB7IG1ha2VTdGF0ZUtleSwgVHJhbnNmZXJTdGF0ZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNmZXJTdGF0ZSwgbWFrZVN0YXRlS2V5IH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCAqIGFzIFJlZGlzIGZyb20gJ3JlZGlzJztcblxuY29uc3QgU1RBVEVfS0VZID0gbWFrZVN0YXRlS2V5KCdhcHBTdGF0ZScpO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5U2VydmljZSB7XG5cbiAgYXBwU3RhdGU6IEFwcFN0YXRlTW9kZWwgPSB7XG4gICAgaXNMb2FkZWQ6IGZhbHNlLFxuICAgIGdlbmVyYWxTZXR0aW5nczogbnVsbCxcbiAgICB0aGVtZVNldHRpbmdzOiBudWxsLFxuICAgIG5hdmlnYXRpb246IG51bGwsXG4gICAgc3RvcmVTZXR0aW5nczogbnVsbCxcbiAgICBzdG9yZUlEOiBudWxsLFxuICAgIGRvbWFpbjogbnVsbCxcbiAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgfTtcblxuICBwcml2YXRlIHJlZGlzVXJsOiBzdHJpbmcgPSAnaHR0cHM6Ly9maXNocnktc3RvcmVmcm9udC1zdGctbmd4LmF6dXJld2Vic2l0ZXMubmV0JztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdkb21haW4nKSBwdWJsaWMgZG9tYWluOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwLFxuICAgIHByaXZhdGUgc3RvcmU6IEZpc2hyeVN0b3JlLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgc3RhdGU6IFRyYW5zZmVyU3RhdGVcbiAgKSB7XG4gICAgdGhpcy5pbml0RG9tYWluKGRvbWFpbik7XG4gICAgdGhpcy5hcHBTdGF0ZSA9IHRoaXMuc3RhdGUuZ2V0KFNUQVRFX0tFWSwgbnVsbCBhcyBBcHBTdGF0ZU1vZGVsKTtcbiAgICBpZiAoIXRoaXMuYXBwU3RhdGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcHBTdGF0ZSBub3Qgc2V0Jyk7XG4gICAgICB0aGlzLmluaXRHZW5lcmFsU2V0dGluZ3MoZG9tYWluKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ2FwcFN0YXRlIGFscmFkeSBzZXQnKTtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignU0VUJywge1xuICAgICAgICBpc0xvYWRlZDogdGhpcy5hcHBTdGF0ZS5pc0xvYWRlZCxcbiAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB0aGlzLmFwcFN0YXRlLmdlbmVyYWxTZXR0aW5ncyxcbiAgICAgICAgdGhlbWVTZXR0aW5nczogdGhpcy5hcHBTdGF0ZS50aGVtZVNldHRpbmdzLFxuICAgICAgICBuYXZpZ2F0aW9uOiB0aGlzLmFwcFN0YXRlLm5hdmlnYXRpb24sXG4gICAgICAgIHN0b3JlU2V0dGluZ3M6IHRoaXMuYXBwU3RhdGUuc3RvcmVTZXR0aW5ncyxcbiAgICAgICAgc3RvcmVJRDogdGhpcy5hcHBTdGF0ZS5zdG9yZUlELFxuICAgICAgICBkb21haW46IHRoaXMuYXBwU3RhdGUuZG9tYWluLFxuICAgICAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgICAgIH0pKTtcbiAgICAgIGNvbnNvbGUubG9nKCd0aGUgc3RhdGUnLCB0aGlzLnN0b3JlLnN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBpbml0RG9tYWluKGRvbWFpbjogc3RyaW5nKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQWN0aW9uKCdTRVQnLCB7IGRvbWFpbjogZG9tYWluIH0pKTtcbiAgfVxuXG4gIGluaXRHZW5lcmFsU2V0dGluZ3MoZG9tYWluOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaEdlbmVyYWxTZXR0aW5ncyh0aGlzLmRvbWFpbikucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnIpXG4gICAgICB9KSxcbiAgICAgIHRhcCgocmVzdWx0OiBJR2VuZXJhbFNldHRpbmdzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQnLCByZXN1bHQpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgZ2VuZXJhbFNldHRpbmdzOiByZXN1bHQgfSkpO1xuICAgICAgICB0aGlzLmluaXRUaGVtZVNldHRpbmdzKHJlc3VsdC50aGVtZV9zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlSUQocmVzdWx0LnN0b3JlSUQpO1xuICAgICAgICB0aGlzLmluaXRTdG9yZVNldHRpbmdzKHJlc3VsdC5zZXR0aW5ncylcbiAgICAgICAgdGhpcy5pbml0TmF2aWdhdGlvbihyZXN1bHQubmF2X2RhdGEpO1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgaXNMb2FkZWQ6IHRydWUgfSkpO1xuICAgICAgICBsZXQgYXBwU3RhdGU6IEFwcFN0YXRlTW9kZWwgPSB7XG4gICAgICAgICAgaXNMb2FkZWQ6IHRoaXMuc3RvcmUuc3RhdGUuaXNMb2FkZWQsXG4gICAgICAgICAgZ2VuZXJhbFNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLmdlbmVyYWxTZXR0aW5ncyxcbiAgICAgICAgICB0aGVtZVNldHRpbmdzOiB0aGlzLnN0b3JlLnN0YXRlLnRoZW1lU2V0dGluZ3MsXG4gICAgICAgICAgbmF2aWdhdGlvbjogdGhpcy5zdG9yZS5zdGF0ZS5uYXZpZ2F0aW9uLFxuICAgICAgICAgIHN0b3JlU2V0dGluZ3M6IHRoaXMuc3RvcmUuc3RhdGUuc3RvcmVTZXR0aW5ncyxcbiAgICAgICAgICBzdG9yZUlEOiB0aGlzLnN0b3JlLnN0YXRlLnN0b3JlSUQsXG4gICAgICAgICAgZG9tYWluOiB0aGlzLnN0b3JlLnN0YXRlLmRvbWFpbixcbiAgICAgICAgICBpc1BsYXRmb3JtQnJvd3NlcjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlLnNldChTVEFURV9LRVksIGFwcFN0YXRlIGFzIEFwcFN0YXRlTW9kZWwpO1xuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcignZXJyb3InLCBlcnJvci5tZXNzYWdlKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIGluaXRUaGVtZVNldHRpbmdzKHRoZW1lU2V0dGluZ3M6IGFueSkge1xuICAgIHRoZW1lU2V0dGluZ3MgPSBKU09OLnBhcnNlKHRoZW1lU2V0dGluZ3MpO1xuICAgIGxldCBtYWluQmFubmVyID0gdGhlbWVTZXR0aW5ncy5tYWluQmFubmVyO1xuICAgIG1haW5CYW5uZXIgPSBPYmplY3Qua2V5cyhtYWluQmFubmVyKS5tYXAoaSA9PiBtYWluQmFubmVyW2ldKTtcbiAgICB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXIgPSBtYWluQmFubmVyO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyB0aGVtZVNldHRpbmdzOiB0aGVtZVNldHRpbmdzIH0pKVxuICB9XG5cbiAgZml4VGhlbWVTZXR0aW5nc0RhdGEodGhlbWVTZXR0aW5nczogYW55KSB7XG4gICAgbGV0IG1haW5CYW5uZXIgPSB0aGVtZVNldHRpbmdzLm1haW5CYW5uZXI7XG4gICAgbWFpbkJhbm5lciA9IE9iamVjdC5rZXlzKG1haW5CYW5uZXIpLm1hcChpID0+IG1haW5CYW5uZXJbaV0pO1xuICAgIHRoZW1lU2V0dGluZ3MubWFpbkJhbm5lciA9IG1haW5CYW5uZXI7XG4gIH1cblxuICBpbml0U3RvcmVJRChzdG9yZUlEOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgc3RvcmVJRDogc3RvcmVJRCB9KSlcbiAgfVxuXG4gIGluaXRTdG9yZVNldHRpbmdzKHNldHRpbmdzOiBhbnkpIHtcbiAgICBzZXR0aW5ncyA9IEpTT04ucGFyc2Uoc2V0dGluZ3MpO1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFjdGlvbignVVBEQVRFJywgeyBzdG9yZVNldHRpbmdzOiBzZXR0aW5ncyB9KSk7XG4gIH1cblxuICBpbml0TmF2aWdhdGlvbihuYXZpZ2F0aW9uOiBhbnkpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBY3Rpb24oJ1VQREFURScsIHsgbmF2aWdhdGlvbjogbmF2aWdhdGlvbiB9KSk7XG4gIH1cblxuICBwcml2YXRlIGZldGNoR2VuZXJhbFNldHRpbmdzKGFwcERvbWFpbj86IHN0cmluZykge1xuICAgIGxldCByZXNwb25zZSA9IHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZWRpc1VybH0vZ2V0LXN0b3JlLWluZm8/ZG9tYWluPSR7YXBwRG9tYWlufWApO1xuICAgIHJldHVybiByZXNwb25zZS5waXBlKFxuICAgICAgbWFwKHJlc3AgPT4gcmVzcC5qc29uKCkuZGF0YSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktZmlzaHJ5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIGZpc2hyeSB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1pbWFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9maXNocnktaW1hZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maXNocnktaW1hZ2UuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaXNocnlJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNyYzogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHJvdXRlOiBzdHJpbmcgPSAncHJvZHVjdCc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBlbmFibGVMYXp5TG9hZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgQFZpZXdDaGlsZCgnaW1nJykgaW1nOiBFbGVtZW50UmVmO1xuICBoaWdoUmVzOiBIVE1MSW1hZ2VFbGVtZW50O1xuICBoaWdoUmVzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gY2RuOiBzdHJpbmcgPSBlbnZpcm9ubWVudC5jZG47XG4gIGNkbjogc3RyaW5nID0gJ2h0dHBzOi8vZmlzaHJ5LWltYWdlLmF6dXJlZWRnZS5uZXQvJztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuaGlnaFJlcyA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5hY3RpdmVMb2FkKCk7XG5cbiAgICAgIGlmICh0aGlzLmVuYWJsZUxhenlMb2FkKSB7XG4gICAgICAgIHRoaXMubGF6eUxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhY3RpdmVMb2FkKCkge1xuICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25lcnJvciA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5vbmVycm9yID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICBpZiAodGhpcy5lbmFibGVMYXp5TG9hZCAmJiB0aGlzLnNpemUgIT09ICd4eHhzJykge1xuICAgICAgICAvLyBJZiBsYXp5IGxvYWRpbmcgaXMgZW5hYmxlZCwgcmV0dXJuIHh4cy5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9L3h4c2A7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAvLyBJZiBsYXp5IGxvYWRpbmcgaXMgZGlzYWJsZWQsIGFuZCBzaXplIGlzIG1lbnRpb25lZCwgcmV0dXJuIHNpemUuXG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS8ke3RoaXMuc2l6ZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGRpc2FibGVkIGFuZCBzaXplIGlzIG5vdCBtZW50aW9uZWQsIHJldHVybiBmdWxsIHNpemUuXG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGF6eUxvYWQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oaWdoUmVzLnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30vJHt0aGlzLnNpemV9YDtcbiAgICB9XG5cbiAgICB0aGlzLmhpZ2hSZXMub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5oaWdoUmVzUmVhZHkgPSB0cnVlO1xuICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSB0aGlzLmhpZ2hSZXMuc3JjO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgICAgdGhpcy5oaWdoUmVzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuaGlnaFJlc1JlYWR5KSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2JsdXItaW4nKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIGlmICh0aGlzLnBsYXRmb3JtU2VydmljZS5wbGF0Zm9ybUJyb3dzZXIoKSkge1xuICAgIC8vIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5ndUNhcm91c2VsQ29uZmlnIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBJQmFubmVyIH0gZnJvbSAnLi4vLi4vc3RvcmUvbW9kZWxzL2Jhbm5lci5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBiYW5uZXI6IElCYW5uZXJbXSA9IFtdO1xuXG4gIGNhcm91c2VsT25lOiBOZ3VDYXJvdXNlbENvbmZpZyA9IHtcbiAgICBncmlkOiB7IHhzOiAxLCBzbTogMSwgbWQ6IDEsIGxnOiAxLCBhbGw6IDAgfSxcbiAgICBzbGlkZTogMSxcbiAgICBzcGVlZDogNDAwLFxuICAgIC8vIGludGVydmFsOiA0MDAwLFxuICAgIHBvaW50OiB7XG4gICAgICB2aXNpYmxlOiB0cnVlXG4gICAgfSxcbiAgICBsb2FkOiAyLFxuICAgIHRvdWNoOiB0cnVlLFxuICAgIGxvb3A6IHRydWUsXG4gICAgY3VzdG9tOiAnYmFubmVyJ1xuICB9XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25hdi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lbnVJdGVtczogYW55W107XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsaXN0RXhpc3RzKGl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAoaXRlbS5saXN0ICYmIGl0ZW0ubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RFbXB0eShpdGVtKTogYm9vbGVhbiB7XG4gICAgaWYgKGl0ZW0ubGlzdCAmJiBpdGVtLmxpc3QubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXNocnlDb21wb25lbnQgfSBmcm9tICcuL2Zpc2hyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5pbXBvcnQgeyBGaXNocnlTZXJ2aWNlIH0gZnJvbSAnLi9maXNocnkuc2VydmljZSc7XG5pbXBvcnQgeyBGaXNocnlJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maXNocnktaW1hZ2UvZmlzaHJ5LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF2Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25hdi9uYXYuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBOZ3VDYXJvdXNlbE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtGaXNocnlDb21wb25lbnQsIEZpc2hyeUltYWdlQ29tcG9uZW50LCBDYXJvdXNlbENvbXBvbmVudCwgTmF2Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0Zpc2hyeUNvbXBvbmVudCwgRmlzaHJ5SW1hZ2VDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50LCBOYXZDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeU1vZHVsZSB7XG4gIGRvbWFpbjogc3RyaW5nO1xuICBzdGF0aWMgZm9yUm9vdChkb21haW46IHN0cmluZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRmlzaHJ5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEZpc2hyeVNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAnZG9tYWluJyxcbiAgICAgICAgICB1c2VWYWx1ZTogZG9tYWluXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJzY2FuIiwiRmlzaHJ5QWN0aW9ucy5TRVQiLCJGaXNocnlBY3Rpb25zLlVQREFURSIsIkZpc2hyeUFjdGlvbnMuREVMRVRFIiwib21pdCIsIlN1YmplY3QiLCJCZWhhdmlvclN1YmplY3QiLCJzaGFyZVJlcGxheSIsImlzUGxhdGZvcm1Ccm93c2VyIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwicGlwZSIsIm1hcCIsImdldCIsImRpc3RpbmN0VW50aWxDaGFuZ2VkIiwiaXNFcXVhbCIsIm1ha2VTdGF0ZUtleSIsImNhdGNoRXJyb3IiLCJ0aHJvd0Vycm9yIiwidGFwIiwic2hhcmUiLCJIdHRwIiwiVHJhbnNmZXJTdGF0ZSIsIkNvbXBvbmVudCIsIklucHV0IiwiVmlld0NoaWxkIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIk1hdE1lbnVNb2R1bGUiLCJNYXRCdXR0b25Nb2R1bGUiLCJOZ3VDYXJvdXNlbE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFlTyxJQUFJLFFBQVEsR0FBRztRQUNsQixRQUFRLEdBQUcsTUFBTSxDQUFD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