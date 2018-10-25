/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
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
export { NavComponent };
if (false) {
    /** @type {?} */
    NavComponent.prototype.menuItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zpc2hyeS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL25hdi9uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RDtJQU9FO0lBQWdCLENBQUM7Ozs7SUFFakIsK0JBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7Ozs7SUFFRCxpQ0FBVTs7OztJQUFWLFVBQVcsSUFBSTtRQUNiLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckMsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Ozs7O0lBRUQsZ0NBQVM7Ozs7SUFBVCxVQUFVLElBQUk7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDOztnQkExQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QiwweUJBQW1DOztpQkFFcEM7Ozs7OzRCQUVFLEtBQUs7O0lBc0JSLG1CQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0F2QlksWUFBWTs7O0lBQ3ZCLGlDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmaXNocnktbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25hdi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lbnVJdGVtczogYW55W107XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBsaXN0RXhpc3RzKGl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAoaXRlbS5saXN0ICYmIGl0ZW0ubGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RFbXB0eShpdGVtKTogYm9vbGVhbiB7XG4gICAgaWYgKGl0ZW0ubGlzdCAmJiBpdGVtLmxpc3QubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==