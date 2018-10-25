/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
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
export { CarouselComponent };
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.banner;
    /** @type {?} */
    CarouselComponent.prototype.carouselOne;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZmlzaHJ5LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6RDtJQXFCRTtRQWZTLFdBQU0sR0FBYyxFQUFFLENBQUM7UUFFaEMsZ0JBQVcsR0FBc0I7WUFDL0IsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1lBQzVDLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLEdBQUc7O1lBRVYsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsUUFBUTtTQUNqQixDQUFBO0lBQ2UsQ0FBQzs7OztJQUVqQixvQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOztnQkF4QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGdoQ0FBd0M7O2lCQUV6Qzs7Ozs7eUJBRUUsS0FBSzs7SUFvQlIsd0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXJCWSxpQkFBaUI7OztJQUM1QixtQ0FBZ0M7O0lBRWhDLHdDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3VDYXJvdXNlbENvbmZpZyB9IGZyb20gJ0BuZ3UvY2Fyb3VzZWwnO1xuaW1wb3J0IHsgSUJhbm5lciB9IGZyb20gJy4uLy4uL3N0b3JlL21vZGVscy9iYW5uZXIubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYmFubmVyOiBJQmFubmVyW10gPSBbXTtcblxuICBjYXJvdXNlbE9uZTogTmd1Q2Fyb3VzZWxDb25maWcgPSB7XG4gICAgZ3JpZDogeyB4czogMSwgc206IDEsIG1kOiAxLCBsZzogMSwgYWxsOiAwIH0sXG4gICAgc2xpZGU6IDEsXG4gICAgc3BlZWQ6IDQwMCxcbiAgICAvLyBpbnRlcnZhbDogNDAwMCxcbiAgICBwb2ludDoge1xuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbG9hZDogMixcbiAgICB0b3VjaDogdHJ1ZSxcbiAgICBsb29wOiB0cnVlLFxuICAgIGN1c3RvbTogJ2Jhbm5lcidcbiAgfVxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn0iXX0=