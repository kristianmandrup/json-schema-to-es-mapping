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
var build = require("../..").build;
var schema = {};
var create = function (opts) { return ({
    type: "object",
    properties: {
        votes: __assign({ type: "number" }, opts)
    },
    schema: schema
}); };
var INT_MAX = Math.pow(2, 31);
var NEG_INT_MAX = -(INT_MAX + 1);
var config = {
    schema: schema,
    logging: true
};
var number = function (opts) {
    var $schema = create(opts);
    var obj = build($schema, config);
    return obj.properties.votes;
};
var result = {
    byte: {
        type: "byte"
    },
    short: {
        type: "short"
    },
    long: {
        type: "long"
    },
    halfFloat: {
        type: "half_float"
    },
    float: {
        type: "float"
    },
    double: {
        type: "double"
    },
    integer: {
        type: "integer"
    }
};
describe("number", function () {
    describe("whole", function () {
        describe("byte", function () {
            test("min: -127, max: 127 - a byte", function () {
                expect(number({ min: -127, max: 127 })).toEqual(result.byte);
            });
            test("min: -127, max: 128 - not byte", function () {
                expect(number({ min: -127, max: 128 })).not.toEqual(result.byte);
            });
            test("max: 127 - not byte", function () {
                expect(number({ max: 127 })).not.toEqual(result.byte);
            });
            test("min: -128 - not byte", function () {
                expect(number({ min: -128 })).not.toEqual(result.byte);
            });
            test("min: -127, max 128 - short", function () {
                expect(number({ min: -127, max: 128 })).toEqual(result.short);
            });
            test("min: INT_MAX - integer", function () {
                expect(number({ min: INT_MAX })).toEqual(result.integer);
            });
            test("min: INT_MAX-1 - long", function () {
                expect(number({ min: NEG_INT_MAX - 1 })).toEqual(result.long);
            });
        });
    });
    describe("floating", function () {
        describe("half-float", function () {
            test("min: -99999", function () {
                expect(number({ min: -99999, multipleOf: 0.1, numType: "half-float" })).toEqual(result.halfFloat);
            });
            test("max: 99999", function () {
                expect(number({ max: 99999, multipleOf: 0.1, numType: "half-float" })).toEqual(result.halfFloat);
            });
        });
        describe("float", function () {
            test("min: -99999", function () {
                expect(number({ min: -99999, multipleOf: 0.1 })).toEqual(result.float);
            });
            test("max: 99999", function () {
                expect(number({ max: 99999, multipleOf: 0.1 })).toEqual(result.float);
            });
        });
        describe("double", function () {
            test("min: -99999", function () {
                expect(number({ min: -99999, multipleOf: 0.1, numType: "double" })).toEqual(result.double);
            });
            test("max: 99999", function () {
                expect(number({ max: 99999, multipleOf: 0.1, numType: "double" })).toEqual(result.double);
            });
        });
    });
});
//# sourceMappingURL=number.test.js.map