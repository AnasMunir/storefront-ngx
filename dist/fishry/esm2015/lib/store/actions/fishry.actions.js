/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
export class Action {
    /**
     * @param {?} type
     * @param {?=} payload
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
if (false) {
    /** @type {?} */
    Action.prototype.type;
    /** @type {?} */
    Action.prototype.payload;
}
/** @type {?} */
export const SET = 'SET';
/** @type {?} */
export const UPDATE = 'UPDATE';
/** @type {?} */
export const DELETE = 'DELETE';
export class setTest {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = 'SET';
    }
}
if (false) {
    /** @type {?} */
    setTest.prototype.type;
    /** @type {?} */
    setTest.prototype.payload;
}
export class updateTest {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = 'UPDATE';
    }
}
if (false) {
    /** @type {?} */
    updateTest.prototype.type;
    /** @type {?} */
    updateTest.prototype.payload;
}
export class deleteTest {
    /**
     * @param {?} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = 'DELETE';
    }
}
if (false) {
    /** @type {?} */
    deleteTest.prototype.type;
    /** @type {?} */
    deleteTest.prototype.payload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxPQUFPLE1BQU07Ozs7O0lBQ2xCLFlBQW1CLElBQVksRUFBUyxPQUFnQztRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFBSSxDQUFDO0NBQzdFOzs7SUFEWSxzQkFBbUI7O0lBQUUseUJBQXVDOzs7QUFHekUsTUFBTSxPQUFPLEdBQUcsR0FBRyxLQUFLOztBQUN4QixNQUFNLE9BQU8sTUFBTSxHQUFHLFFBQVE7O0FBQzlCLE1BQU0sT0FBTyxNQUFNLEdBQUcsUUFBUTtBQUU5QixNQUFNLE9BQU8sT0FBTzs7OztJQUduQixZQUFtQixPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBRmhDLFNBQUksR0FBRyxLQUFLLENBQUM7SUFFdUIsQ0FBQztDQUM5Qzs7O0lBSEEsdUJBQXNCOztJQUVWLDBCQUE2Qjs7QUFHMUMsTUFBTSxPQUFPLFVBQVU7Ozs7SUFHdEIsWUFBbUIsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUZoQyxTQUFJLEdBQUcsUUFBUSxDQUFDO0lBRW9CLENBQUM7Q0FDOUM7OztJQUhBLDBCQUF5Qjs7SUFFYiw2QkFBNkI7O0FBRzFDLE1BQU0sT0FBTyxVQUFVOzs7O0lBR3RCLFlBQW1CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFGaEMsU0FBSSxHQUFHLFFBQVEsQ0FBQztJQUVvQixDQUFDO0NBQzlDOzs7SUFIQSwwQkFBeUI7O0lBRWIsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb24ge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgcGF5bG9hZD86IFBhcnRpYWw8QXBwU3RhdGVNb2RlbD4pIHsgfVxufVxuXG5leHBvcnQgY29uc3QgU0VUID0gJ1NFVCc7XG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ1VQREFURSc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5cbmV4cG9ydCBjbGFzcyBzZXRUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdTRVQnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIHVwZGF0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ1VQREFURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgZGVsZXRlVGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnREVMRVRFJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvbnMgPSBzZXRUZXN0IHwgdXBkYXRlVGVzdCB8IGRlbGV0ZVRlc3Q7Il19