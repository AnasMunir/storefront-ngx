/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export { FishryImageComponent };
if (false) {
    /** @type {?} */
    FishryImageComponent.prototype.src;
    /** @type {?} */
    FishryImageComponent.prototype.route;
    /** @type {?} */
    FishryImageComponent.prototype.size;
    /** @type {?} */
    FishryImageComponent.prototype.enableLazyLoad;
    /** @type {?} */
    FishryImageComponent.prototype.img;
    /** @type {?} */
    FishryImageComponent.prototype.highRes;
    /** @type {?} */
    FishryImageComponent.prototype.highResReady;
    /** @type {?} */
    FishryImageComponent.prototype.cdn;
    /** @type {?} */
    FishryImageComponent.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zpc2hyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQ7SUFpQkUsOEJBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFYbEQsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUNqQixVQUFLLEdBQVcsU0FBUyxDQUFDO1FBQzFCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFJeEMsaUJBQVksR0FBWSxLQUFLLENBQUM7O1FBRTlCLFFBQUcsR0FBVyxxQ0FBcUMsQ0FBQztJQUVXLENBQUM7Ozs7SUFFaEUsdUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVsQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELHlDQUFVOzs7SUFBVjtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUc7WUFDL0IsSUFBSSxLQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxD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b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLHNGQUE0Qzs7aUJBRTdDOzs7O2dCQWFzRCxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVzs7O3NCQVg5QixLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSztpQ0FDTCxLQUFLO3NCQUVMLFNBQVMsU0FBQyxLQUFLOztJQTBFbEIsMkJBQUM7Q0FBQSxBQXJGRCxJQXFGQztTQWhGWSxvQkFBb0I7OztJQUMvQixtQ0FBMEI7O0lBQzFCLHFDQUFtQzs7SUFDbkMsb0NBQTJCOztJQUMzQiw4Q0FBd0M7O0lBRXhDLG1DQUFrQzs7SUFDbEMsdUNBQTBCOztJQUMxQiw0Q0FBOEI7O0lBRTlCLG1DQUFvRDs7SUFFeEMsMENBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmlzaHJ5LWltYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zpc2hyeS1pbWFnZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeUltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgcm91dGU6IHN0cmluZyA9ICdwcm9kdWN0JztcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGVuYWJsZUxhenlMb2FkOiBib29sZWFuID0gdHJ1ZTtcblxuICBAVmlld0NoaWxkKCdpbWcnKSBpbWc6IEVsZW1lbnRSZWY7XG4gIGhpZ2hSZXM6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGhpZ2hSZXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBjZG46IHN0cmluZyA9IGVudmlyb25tZW50LmNkbjtcbiAgY2RuOiBzdHJpbmcgPSAnaHR0cHM6Ly9maXNocnktaW1hZ2UuYXp1cmVlZGdlLm5ldC8nO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5oaWdoUmVzID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLmFjdGl2ZUxvYWQoKTtcblxuICAgICAgaWYgKHRoaXMuZW5hYmxlTGF6eUxvYWQpIHtcbiAgICAgICAgdGhpcy5sYXp5TG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFjdGl2ZUxvYWQoKSB7XG4gICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9uZXJyb3IgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgIGlmICh0aGlzLmVuYWJsZUxhenlMb2FkICYmIHRoaXMuc2l6ZSAhPT0gJ3h4eHMnKSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBlbmFibGVkLCByZXR1cm4geHhzLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30veHhzYDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBkaXNhYmxlZCwgYW5kIHNpemUgaXMgbWVudGlvbmVkLCByZXR1cm4gc2l6ZS5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9LyR7dGhpcy5zaXplfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBsYXp5IGxvYWRpbmcgaXMgZGlzYWJsZWQgYW5kIHNpemUgaXMgbm90IG1lbnRpb25lZCwgcmV0dXJuIGZ1bGwgc2l6ZS5cbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsYXp5TG9hZCgpIHtcbiAgICBpZiAodGhpcy5zaXplID09PSAnJykge1xuICAgICAgdGhpcy5oaWdoUmVzLnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZ2hSZXMuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS8ke3RoaXMuc2l6ZX1gO1xuICAgIH1cblxuICAgIHRoaXMuaGlnaFJlcy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmhpZ2hSZXNSZWFkeSA9IHRydWU7XG4gICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuaGlnaFJlcy5zcmM7XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgICB0aGlzLmhpZ2hSZXMub25lcnJvciA9IG51bGw7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5oaWdoUmVzUmVhZHkpIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYmx1ci1pbicpO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8gaWYgKHRoaXMucGxhdGZvcm1TZXJ2aWNlLnBsYXRmb3JtQnJvd3NlcigpKSB7XG4gICAgLy8gfVxuICB9XG5cbn1cbiJdfQ==