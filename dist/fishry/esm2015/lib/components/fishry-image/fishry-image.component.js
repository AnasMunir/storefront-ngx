/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class FishryImageComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zpc2hyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zpc2hyeS1pbWFnZS9maXNocnktaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPcEQsTUFBTSxPQUFPLG9CQUFvQjs7OztJQVkvQixZQUF5QyxVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBWGxELFFBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFXLFNBQVMsQ0FBQztRQUMxQixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBSXhDLGlCQUFZLEdBQVksS0FBSyxDQUFDOztRQUU5QixRQUFHLEdBQVcscUNBQXFDLENBQUM7SUFFVyxDQUFDOzs7O0lBRWhFLFFBQVE7UUFDTixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxD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Qzs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsc0ZBQTRDOzthQUU3Qzs7OztZQWFzRCxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVzs7O2tCQVg5QixLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzs2QkFDTCxLQUFLO2tCQUVMLFNBQVMsU0FBQyxLQUFLOzs7O0lBTGhCLG1DQUEwQjs7SUFDMUIscUNBQW1DOztJQUNuQyxvQ0FBMkI7O0lBQzNCLDhDQUF3Qzs7SUFFeEMsbUNBQWtDOztJQUNsQyx1Q0FBMEI7O0lBQzFCLDRDQUE4Qjs7SUFFOUIsbUNBQW9EOztJQUV4QywwQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktaW1hZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlzaHJ5LWltYWdlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlzaHJ5SW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBzcmM6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSByb3V0ZTogc3RyaW5nID0gJ3Byb2R1Y3QnO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgZW5hYmxlTGF6eUxvYWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBWaWV3Q2hpbGQoJ2ltZycpIGltZzogRWxlbWVudFJlZjtcbiAgaGlnaFJlczogSFRNTEltYWdlRWxlbWVudDtcbiAgaGlnaFJlc1JlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gIC8vIGNkbjogc3RyaW5nID0gZW52aXJvbm1lbnQuY2RuO1xuICBjZG46IHN0cmluZyA9ICdodHRwczovL2Zpc2hyeS1pbWFnZS5henVyZWVkZ2UubmV0Lyc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuYWN0aXZlTG9hZCgpO1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVMYXp5TG9hZCkge1xuICAgICAgICB0aGlzLmxhenlMb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWN0aXZlTG9hZCgpIHtcbiAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50Lm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25lcnJvciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlTGF6eUxvYWQgJiYgdGhpcy5zaXplICE9PSAneHh4cycpIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGVuYWJsZWQsIHJldHVybiB4eHMuXG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfS94eHNgO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgLy8gSWYgbGF6eSBsb2FkaW5nIGlzIGRpc2FibGVkLCBhbmQgc2l6ZSBpcyBtZW50aW9uZWQsIHJldHVybiBzaXplLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY30vJHt0aGlzLnNpemV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIGxhenkgbG9hZGluZyBpcyBkaXNhYmxlZCBhbmQgc2l6ZSBpcyBub3QgbWVudGlvbmVkLCByZXR1cm4gZnVsbCBzaXplLlxuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LnNyYyA9IGAke3RoaXMuY2RufSR7dGhpcy5yb3V0ZX0vJHt0aGlzLnNyY31gO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxhenlMb2FkKCkge1xuICAgIGlmICh0aGlzLnNpemUgPT09ICcnKSB7XG4gICAgICB0aGlzLmhpZ2hSZXMuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlnaFJlcy5zcmMgPSBgJHt0aGlzLmNkbn0ke3RoaXMucm91dGV9LyR7dGhpcy5zcmN9LyR7dGhpcy5zaXplfWA7XG4gICAgfVxuXG4gICAgdGhpcy5oaWdoUmVzLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHRoaXMuaGlnaFJlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gdGhpcy5oaWdoUmVzLnNyYztcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgdGhpcy5oaWdoUmVzLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQuc3JjID0gYCR7dGhpcy5jZG59JHt0aGlzLnJvdXRlfS8ke3RoaXMuc3JjfWA7XG4gICAgICAgIHRoaXMuaGlnaFJlcy5vbmVycm9yID0gbnVsbDtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW1nLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmhpZ2hSZXNSZWFkeSkge1xuICAgICAgICB0aGlzLmltZy5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbWcubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdibHVyLWluJyk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBpZiAodGhpcy5wbGF0Zm9ybVNlcnZpY2UucGxhdGZvcm1Ccm93c2VyKCkpIHtcbiAgICAvLyB9XG4gIH1cblxufVxuIl19