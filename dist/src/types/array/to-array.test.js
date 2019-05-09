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
var _a = require("."), isArray = _a.isArray, toArray = _a.toArray, MappingArray = _a.MappingArray;
var create = function (opts) { return (__assign({ type: "array" }, opts)); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return { key: "name", type: value.type, value: value, schema: schema, config: config };
};
var array = function (opts) {
    var $opts = objFor(opts);
    return toArray($opts);
};
describe("isArray", function () {
    test("type: array - true", function () {
        expect(isarray("array")).toBeTruthy();
    });
    test("type: integer - true", function () {
        expect(isarray("integer")).toBeTruthy();
    });
    test("type: array - false", function () {
        expect(isarray("array")).toBeFalsy();
    });
});
describe.only("MappingArray", function () {
    var obj = objFor();
    var mapper = MappingArray.create(obj);
    describe("type", function () {
        test("default: is array", function () {
            expect(mapper.type).toEqual("nested");
        });
    });
});
//# sourceMappingURL=to-array.test.js.map