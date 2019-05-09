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
var createLookupObject = require("./lookup").createLookupObject;
var create = function (opts, config) {
    if (config === void 0) { config = {}; }
    return createLookupObject(opts, config);
};
describe("lookup", function () {
    var config = {};
    var $opts = {
        key: "name",
        value: {
            type: "string"
        },
        parentName: "person",
        resultKeyName: "name"
    };
    describe("object", function () {
        var object = {
            key: $opts.key,
            resultKey: $opts.resultKeyName,
            parentName: $opts.parentName,
            schemaValue: $opts.value
        };
        describe("without typeName", function () {
            var opts = $opts;
            var lookup = create(opts, config);
            test("no typeName", function () {
                expect(lookup.object).toEqual(object);
            });
        });
        describe("with typeName", function () {
            var opts = __assign({}, $opts, { typeName: "string" });
            var lookup = create(opts, config);
            var objwType = __assign({}, object, { typeName: opts.typeName });
            test("has typeName", function () {
                expect(lookup.object).toEqual(objwType);
            });
        });
    });
});
//# sourceMappingURL=lookup.test.js.map