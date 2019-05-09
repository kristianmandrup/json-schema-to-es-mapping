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
var _a = require("./boolean"), isBoolean = _a.isBoolean, toBoolean = _a.toBoolean, MappingBoolean = _a.MappingBoolean;
var create = function (opts) { return (__assign({ type: "boolean" }, opts)); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return { key: "name", type: value.type, value: value, schema: schema, config: config };
};
var boolean = function (opts) {
    var $opts = objFor(opts);
    return toBoolean($opts);
};
describe("isBoolean", function () {
    test("type: boolean - true", function () {
        expect(isboolean("boolean")).toBeTruthy();
    });
    test("type: integer - true", function () {
        expect(isboolean("integer")).toBeTruthy();
    });
    test("type: boolean - false", function () {
        expect(isboolean("boolean")).toBeFalsy();
    });
});
describe.only("MappingBoolean", function () {
    var obj = objFor();
    var mapper = MappingBoolean.create(obj);
    describe("type", function () {
        test("default: is boolean", function () {
            expect(mapper.type).toEqual("boolean");
        });
    });
});
//# sourceMappingURL=to-boolean.test.js.map