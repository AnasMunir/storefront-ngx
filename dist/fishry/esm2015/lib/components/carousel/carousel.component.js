/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class CarouselComponent {
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
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.banner;
    /** @type {?} */
    CarouselComponent.prototype.carouselOne;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlzaHJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVN6RCxNQUFNLE9BQU8saUJBQWlCO0lBZ0I1QjtRQWZTLFdBQU0sR0FBYyxFQUFFLENBQUM7UUFFaEMsZ0JBQVcsR0FBc0I7WUFDL0IsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQzVDLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLEdBQUc7O1lBRVYsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFBO0lBQ2UsQ0FBQzs7OztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7O1lBeEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixnaENBQXdDOzthQUV6Qzs7Ozs7cUJBRUUsS0FBSzs7OztJQUFOLG1DQUFnQzs7SUFFaEMsd0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5ndUNhcm91c2VsQ29uZmlnIH0gZnJvbSAnQG5ndS9jYXJvdXNlbCc7XG5pbXBvcnQgeyBJQmFubmVyIH0gZnJvbSAnLi4vLi4vc3RvcmUvbW9kZWxzL2Jhbm5lci5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zpc2hyeS1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBiYW5uZXI6IElCYW5uZXJbXSA9IFtdO1xuXG4gIGNhcm91c2VsT25lOiBOZ3VDYXJvdXNlbENvbmZpZyA9IHtcbiAgICBncmlkOiB7IHhzOiAxLCBzbTogMSwgbWQ6IDEsIGxnOiAxLCBhbGw6IDAgfSxcbiAgICBzbGlkZTogMSxcbiAgICBzcGVlZDogNDAwLFxuICAgIC8vIGludGVydmFsOiA0MDAwLFxuICAgIHBvaW50OiB7XG4gICAgICB2aXNpYmxlOiB0cnVlXG4gICAgfSxcbiAgICBsb2FkOiAyLFxuICAgIHRvdWNoOiB0cnVlLFxuICAgIGxvb3A6IHRydWUsXG4gICAgY3VzdG9tOiAnYmFubmVyJ1xuICB9XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufSJdfQ==