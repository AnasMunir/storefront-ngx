/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { scan } from "rxjs/operators";
import * as FishryActions from '../actions/fishry.actions';
import { omit } from "lodash";
/** @type {?} */
export var reducer = function () {
    return scan(function (state, action) {
        /** @type {?} */
        var next;
        switch (action.type) {
            case FishryActions.SET:
                next = action.payload;
                break;
            case FishryActions.UPDATE:
                next = tslib_1.__assign({}, state, action.payload);
                break;
            case FishryActions.DELETE:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvcmVkdWNlcnMvZmlzaHJ5LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxLQUFLLGFBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDOztBQUU5QixNQUFNLEtBQU8sT0FBTyxHQUFHO0lBQ3RCLE9BQUEsSUFBSSxDQUFNLFVBQUMsS0FBb0IsRUFBRSxNQUE2Qjs7WUFDekQsSUFBSTtRQUNSLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQixLQUFLLGFBQWEsQ0FBQyxHQUFHO2dCQUNyQixJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDdEIsTUFBTTtZQUNQLEtBQUssYUFBYSxDQUFDLE1BQU07Z0JBQ3hCLElBQUksd0JBQVEsS0FBSyxFQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUUsQ0FBQztnQkFDdkMsTUFBTTtZQUNQLEtBQUssYUFBYSxDQUFDLE1BQU07Z0JBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsTUFBTTtZQUNQO2dCQUNDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2IsTUFBTTtTQUNQO1FBQ0Q7OztZQUdJO1FBRUosT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDO0FBdEJOLENBc0JNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NhbiB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9ICgpID0+XG5cdHNjYW48YW55Pigoc3RhdGU6IEFwcFN0YXRlTW9kZWwsIGFjdGlvbjogRmlzaHJ5QWN0aW9ucy5BY3Rpb25zKSA9PiB7XG5cdFx0bGV0IG5leHQ7XG5cdFx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xuXHRcdFx0Y2FzZSBGaXNocnlBY3Rpb25zLlNFVDpcblx0XHRcdFx0bmV4dCA9IGFjdGlvbi5wYXlsb2FkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5VUERBVEU6XG5cdFx0XHRcdG5leHQgPSB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5ERUxFVEU6XG5cdFx0XHRcdG5leHQgPSBvbWl0KHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0bmV4dCA9IHN0YXRlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0LyogaWYgKHN0YXRlLmlzUGxhdGZvcm1Ccm93c2VyKSB7XG5cdFx0XHRjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRcdFx0d2luLmRldlRvb2xzLnNlbmQoYWN0aW9uLnR5cGUsIG5leHQpO1xuXHRcdH0gKi9cblxuXHRcdHJldHVybiBuZXh0O1xuXHR9LCB7fSk7Il19