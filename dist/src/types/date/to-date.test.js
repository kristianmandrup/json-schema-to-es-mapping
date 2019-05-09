"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a = require("."), isDate = _a.isDate, toDate = _a.toDate, MappingDate = _a.MappingDate;
var create = function (opts) { return (__assign({ type: "date" }, opts)); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return { key: "name", type: value.type, value: value, schema: schema, config: config };
};
var date = function (opts) {
    var $opts = objFor(opts);
    return toDate($opts);
};
describe("isDate", function () {
    test("type: date - true", function () {
        expect(isdate("date")).toBeTruthy();
    });
    test("type: integer - true", function () {
        expect(isdate("integer")).toBeTruthy();
    });
    test("type: date - false", function () {
        expect(isdate("date")).toBeFalsy();
    });
});
describe.only("MappingDate", function () {
    var obj = objFor();
    var mapper = MappingDate.create(obj);
    describe("type", function () {
        test("default: is date", function () {
            expect(mapper.type).toEqual("date");
        });
    });
});
//# sourceMappingURL=to-date.test.js.map