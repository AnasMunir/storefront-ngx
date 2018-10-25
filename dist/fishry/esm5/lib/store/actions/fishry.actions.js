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
export { Action };
if (false) {
    /** @type {?} */
    Action.prototype.type;
    /** @type {?} */
    Action.prototype.payload;
}
/** @type {?} */
export var SET = 'SET';
/** @type {?} */
export var UPDATE = 'UPDATE';
/** @type {?} */
export var DELETE = 'DELETE';
var setTest = /** @class */ (function () {
    function setTest(payload) {
        this.payload = payload;
        this.type = 'SET';
    }
    return setTest;
}());
export { setTest };
if (false) {
    /** @type {?} */
    setTest.prototype.type;
    /** @type {?} */
    setTest.prototype.payload;
}
var updateTest = /** @class */ (function () {
    function updateTest(payload) {
        this.payload = payload;
        this.type = 'UPDATE';
    }
    return updateTest;
}());
export { updateTest };
if (false) {
    /** @type {?} */
    updateTest.prototype.type;
    /** @type {?} */
    updateTest.prototype.payload;
}
var deleteTest = /** @class */ (function () {
    function deleteTest(payload) {
        this.payload = payload;
        this.type = 'DELETE';
    }
    return deleteTest;
}());
export { deleteTest };
if (false) {
    /** @type {?} */
    deleteTest.prototype.type;
    /** @type {?} */
    deleteTest.prototype.payload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaHJ5LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9maXNocnkvIiwic291cmNlcyI6WyJsaWIvc3RvcmUvYWN0aW9ucy9maXNocnkuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFDQyxnQkFBbUIsSUFBWSxFQUFTLE9BQWdDO1FBQXJELFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUFJLENBQUM7SUFDOUUsYUFBQztBQUFELENBQUMsQUFGRCxJQUVDOzs7O0lBRFksc0JBQW1COztJQUFFLHlCQUF1Qzs7O0FBR3pFLE1BQU0sS0FBTyxHQUFHLEdBQUcsS0FBSzs7QUFDeEIsTUFBTSxLQUFPLE1BQU0sR0FBRyxRQUFROztBQUM5QixNQUFNLEtBQU8sTUFBTSxHQUFHLFFBQVE7QUFFOUI7SUFHQyxpQkFBbUIsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUZoQyxTQUFJLEdBQUcsS0FBSyxDQUFDO0lBRXVCLENBQUM7SUFDL0MsY0FBQztBQUFELENBQUMsQUFKRCxJQUlDOzs7O0lBSEEsdUJBQXNCOztJQUVWLDBCQUE2Qjs7QUFHMUM7SUFHQyxvQkFBbUIsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUZoQyxTQUFJLEdBQUcsUUFBUSxDQUFDO0lBRW9CLENBQUM7SUFDL0MsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQzs7OztJQUhBLDBCQUF5Qjs7SUFFYiw2QkFBNkI7O0FBRzFDO0lBR0Msb0JBQW1CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFGaEMsU0FBSSxHQUFHLFFBQVEsQ0FBQztJQUVvQixDQUFDO0lBQy9DLGlCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7Ozs7SUFIQSwwQkFBeUI7O0lBRWIsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwU3RhdGVNb2RlbCB9IGZyb20gXCIuLi9tb2RlbHMvZmlzaHJ5Lm1vZGVsXCI7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb24ge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgcGF5bG9hZD86IFBhcnRpYWw8QXBwU3RhdGVNb2RlbD4pIHsgfVxufVxuXG5leHBvcnQgY29uc3QgU0VUID0gJ1NFVCc7XG5leHBvcnQgY29uc3QgVVBEQVRFID0gJ1VQREFURSc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5cbmV4cG9ydCBjbGFzcyBzZXRUZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcblx0cmVhZG9ubHkgdHlwZSA9ICdTRVQnO1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBBcHBTdGF0ZU1vZGVsKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIHVwZGF0ZVRlc3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuXHRyZWFkb25seSB0eXBlID0gJ1VQREFURSc7XG5cblx0Y29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEFwcFN0YXRlTW9kZWwpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgZGVsZXRlVGVzdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG5cdHJlYWRvbmx5IHR5cGUgPSAnREVMRVRFJztcblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogQXBwU3RhdGVNb2RlbCkgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvbnMgPSBzZXRUZXN0IHwgdXBkYXRlVGVzdCB8IGRlbGV0ZVRlc3Q7Il19