/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { FishryComponent } from './fishry.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatButtonModule } from "@angular/material";
import { NguCarouselModule } from '@ngu/carousel';
import { FishryService } from './fishry.service';
import { FishryImageComponent } from './components/fishry-image/fishry-image.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavComponent } from './components/nav/nav.component';
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
export { FishryModule };
if (false) {
    /** @type {?} */
    FishryModule.prototype.domain;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zpc2hyeS8iLCJzb3VyY2VzIjpbImxpYi9maXNocnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RDtJQUFBO0lBeUJBLENBQUM7Ozs7O0lBWlEsb0JBQU87Ozs7SUFBZCxVQUFlLE1BQWM7UUFDM0IsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxhQUFhO2dCQUNiO29CQUNFLE9BQU8sRUFBRSxRQUFRO29CQUNqQixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDOztnQkF4QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsYUFBYTt3QkFDYixlQUFlO3dCQUNmLGlCQUFpQjtxQkFDbEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQztvQkFDdEYsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQztpQkFDbEY7O0lBZUQsbUJBQUM7Q0FBQSxBQXpCRCxJQXlCQztTQWRZLFlBQVk7OztJQUN2Qiw4QkFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXNocnlDb21wb25lbnQgfSBmcm9tICcuL2Zpc2hyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgTmd1Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAbmd1L2Nhcm91c2VsJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvY29yZSc7XG5pbXBvcnQgeyBGaXNocnlTZXJ2aWNlIH0gZnJvbSAnLi9maXNocnkuc2VydmljZSc7XG5pbXBvcnQgeyBGaXNocnlJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9maXNocnktaW1hZ2UvZmlzaHJ5LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF2Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL25hdi9uYXYuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBOZ3VDYXJvdXNlbE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtGaXNocnlDb21wb25lbnQsIEZpc2hyeUltYWdlQ29tcG9uZW50LCBDYXJvdXNlbENvbXBvbmVudCwgTmF2Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0Zpc2hyeUNvbXBvbmVudCwgRmlzaHJ5SW1hZ2VDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50LCBOYXZDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEZpc2hyeU1vZHVsZSB7XG4gIGRvbWFpbjogc3RyaW5nO1xuICBzdGF0aWMgZm9yUm9vdChkb21haW46IHN0cmluZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRmlzaHJ5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEZpc2hyeVNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAnZG9tYWluJyxcbiAgICAgICAgICB1c2VWYWx1ZTogZG9tYWluXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbn1cbiJdfQ==