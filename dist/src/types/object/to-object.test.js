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
var _a = require("./object"), isObject = _a.isObject, toObject = _a.toObject, MappingObject = _a.MappingObject;
var create = function (opts) { return (__assign({ type: "object" }, opts)); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return { key: "person", type: value.type, value: value, schema: schema, config: config };
};
var object = function (opts) {
    var $opts = objFor(opts);
    return toObject($opts);
};
describe("isObject", function () {
    test("type: object - true", function () {
        expect(isobject("object")).toBeTruthy();
    });
    test("type: integer - true", function () {
        expect(isobject("integer")).toBeTruthy();
    });
    test("type: object - false", function () {
        expect(isobject("object")).toBeFalsy();
    });
});
describe.only("MappingObject", function () {
    var obj = objFor();
    var mapper = MappingObject.create(obj);
    describe("type", function () {
        test("default: is object", function () {
            expect(mapper.type).toEqual("object");
        });
    });
});
//# sourceMappingURL=to-object.test.js.map