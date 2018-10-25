/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { scan } from "rxjs/operators";
import * as FishryActions from '../actions/fishry.actions';
import { omit } from "lodash";
/** @type {?} */
export const reducer = () => scan((state, action) => {
    /** @type {?} */
    let next;
    switch (action.type) {
        case FishryActions.SET:
            next = action.payload;
            break;
        case FishryActions.UPDATE:
            next = Object.assign({}, state, action.payload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LnJlZHVjZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvcmVkdWNlcnMvZmlzaHJ5LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEtBQUssYUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBRTNELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7O0FBRTlCLE1BQU0sT0FBTyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQzNCLElBQUksQ0FBTSxDQUFDLEtBQW9CLEVBQUUsTUFBNkIsRUFBRSxFQUFFOztRQUM3RCxJQUFJO0lBQ1IsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ3BCLEtBQUssYUFBYSxDQUFDLEdBQUc7WUFDckIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDdEIsTUFBTTtRQUNQLEtBQUssYUFBYSxDQUFDLE1BQU07WUFDeEIsSUFBSSxxQkFBUSxLQUFLLEVBQUssTUFBTSxDQUFDLE9BQU8sQ0FBRSxDQUFDO1lBQ3ZDLE1BQU07UUFDUCxLQUFLLGFBQWEsQ0FBQyxNQUFNO1lBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQyxNQUFNO1FBQ1A7WUFDQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2IsTUFBTTtLQUNQO0lBQ0Q7OztRQUdJO0lBRUosT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NhbiB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5pbXBvcnQgKiBhcyBGaXNocnlBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMvZmlzaHJ5LmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgY29uc3QgcmVkdWNlciA9ICgpID0+XG5cdHNjYW48YW55Pigoc3RhdGU6IEFwcFN0YXRlTW9kZWwsIGFjdGlvbjogRmlzaHJ5QWN0aW9ucy5BY3Rpb25zKSA9PiB7XG5cdFx0bGV0IG5leHQ7XG5cdFx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xuXHRcdFx0Y2FzZSBGaXNocnlBY3Rpb25zLlNFVDpcblx0XHRcdFx0bmV4dCA9IGFjdGlvbi5wYXlsb2FkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5VUERBVEU6XG5cdFx0XHRcdG5leHQgPSB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRmlzaHJ5QWN0aW9ucy5ERUxFVEU6XG5cdFx0XHRcdG5leHQgPSBvbWl0KHN0YXRlLCBhY3Rpb24ucGF5bG9hZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0bmV4dCA9IHN0YXRlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0LyogaWYgKHN0YXRlLmlzUGxhdGZvcm1Ccm93c2VyKSB7XG5cdFx0XHRjb25zdCB3aW4gPSB3aW5kb3cgYXMgYW55O1xuXHRcdFx0d2luLmRldlRvb2xzLnNlbmQoYWN0aW9uLnR5cGUsIG5leHQpO1xuXHRcdH0gKi9cblxuXHRcdHJldHVybiBuZXh0O1xuXHR9LCB7fSk7Il19