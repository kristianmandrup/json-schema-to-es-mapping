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
var _a = require("."), isNumber = _a.isNumber, toNumber = _a.toNumber, MappingNumber = _a.MappingNumber;
var create = function (opts) { return (__assign({ type: "number" }, opts)); };
var INT_MAX = Math.pow(2, 31);
var NEG_INT_MAX = -(INT_MAX + 1);
var config = {};
var schema = {};
var objFor = function (opts) {
    var value = create(opts);
    return { key: "votes", type: value.type, value: value, schema: schema, config: config };
};
var number = function (opts) {
    var $opts = objFor(opts);
    return toNumber($opts);
};
describe("isNumber", function () {
    test("type: number - true", function () {
        expect(isNumber("number")).toBeTruthy();
    });
    test("type: integer - true", function () {
        expect(isNumber("integer")).toBeTruthy();
    });
    test("type: string - false", function () {
        expect(isNumber("string")).toBeFalsy();
    });
});
describe("MappingNumber", function () {
    describe("min: -127", function () {
        var obj = objFor({ min: -127 });
        var mapper = MappingNumber.create(obj);
        describe("numType", function () {
            test("is not byte", function () {
                expect(mapper.numType === "byte").toBeFalsy();
            });
        });
        describe("minFn(-128)", function () {
            test("true", function () {
                expect(mapper.minFn(-128)).toBeTruthy();
            });
        });
        describe("maxExcl", function () {
            test("is INT_MAX", function () {
                expect(mapper.maxExcl).toBe(INT_MAX - 1);
            });
        });
        describe("minExcl", function () {
            test("is 0", function () {
                expect(mapper.minExcl).toBe(-INT_MAX);
            });
        });
        describe("maxFn(127)", function () {
            test("true", function () {
                expect(mapper.maxFn(127)).toBeFalsy();
            });
        });
        describe("inMaxRangeIncl(127)", function () {
            test("false", function () {
                expect(mapper.inMaxRangeIncl(127)).toBeFalsy();
            });
        });
        describe("inRange -128, 127", function () {
            test("false", function () {
                var min = -(127 + 1);
                var max = 127;
                expect(mapper.inRange(min, max)).toBeFalsy();
            });
        });
        describe("inPosNegRange(127)", function () {
            test("false", function () {
                expect(mapper.inPosNegRange(127)).toBeFalsy();
            });
        });
        describe("isByte", function () {
            test("false", function () {
                expect(mapper.isByte).toBeFalsy();
            });
        });
        describe("byte", function () {
            test("is false", function () {
                expect(mapper.byte).toBeFalsy();
            });
        });
        describe("configType", function () {
            test("is undefined", function () {
                expect(mapper.configType).toBeUndefined();
            });
        });
        describe("formatType", function () {
            test("is undefined", function () {
                expect(mapper.formatType).toBeUndefined();
            });
        });
        describe("calcNumericType", function () {
            test("is byte", function () {
                expect(mapper.calcNumericType).toEqual("integer");
            });
        });
        describe("baseType", function () {
            test("is float", function () {
                expect(mapper.baseType).toEqual("float");
            });
        });
    });
    describe("max: 128", function () {
        var obj = objFor({ max: 128 });
        var mapper = MappingNumber.create(obj);
        describe("minFn(-128)", function () {
            test("true", function () {
                expect(mapper.minFn(-128)).toBeFalsy();
            });
        });
        describe("maxFn(127)", function () {
            test("false", function () {
                expect(mapper.maxFn(127)).toBeFalsy();
            });
        });
        describe("inMaxRangeIncl(127)", function () {
            test("false", function () {
                expect(mapper.inMaxRangeIncl(127)).toBeFalsy();
            });
        });
        describe("inRange -128, 127", function () {
            test("false", function () {
                var min = -(127 + 1);
                var max = 127;
                expect(mapper.inRange(min, max)).toBeFalsy();
            });
        });
        describe("inPosNegRange(127)", function () {
            test("false", function () {
                expect(mapper.inPosNegRange(127)).toBeFalsy();
            });
        });
        describe("isByte", function () {
            test("false", function () {
                expect(mapper.isByte).toBeFalsy();
            });
        });
        describe("type", function () {
            test("not a byte", function () {
                expect(mapper.type).not.toEqual("byte");
            });
        });
    });
    describe("min: -127, max: 127", function () {
        var obj = objFor({ min: -127, max: 127 });
        var mapper = MappingNumber.create(obj);
        describe("minFn(-128)", function () {
            test("true", function () {
                expect(mapper.minFn(-128)).toBeTruthy();
            });
        });
        describe("maxFn(127)", function () {
            test("false", function () {
                expect(mapper.maxFn(127)).toBeTruthy();
            });
        });
        describe("inMaxRangeIncl(127)", function () {
            test("true", function () {
                expect(mapper.inMaxRangeIncl(127)).toBeTruthy();
            });
        });
        describe("inRange -128, 127", function () {
            test("true", function () {
                var min = -(127 + 1);
                var max = 127;
                expect(mapper.inRange(min, max)).toBeTruthy();
            });
        });
        describe("inPosNegRange(127)", function () {
            test("true", function () {
                expect(mapper.inPosNegRange(127)).toBeTruthy();
            });
        });
        describe("isByte", function () {
            test("true", function () {
                expect(mapper.isByte).toBeTruthy();
            });
        });
        describe("type", function () {
            test("is a byte", function () {
                expect(mapper.type).toEqual("byte");
            });
        });
    });
    describe("min: INT_MAX - 2", function () {
        var obj = objFor({ min: INT_MAX - 2 });
        var mapper = MappingNumber.create(obj);
        describe("minFn(NEG_INT_MAX)", function () {
            test("true", function () {
                expect(mapper.minFn(NEG_INT_MAX)).toBeTruthy();
            });
        });
        describe("maxFn(INT_MAX)", function () {
            test("false", function () {
                expect(mapper.maxFn(INT_MAX)).toBeTruthy();
            });
        });
        describe("inMaxRangeIncl(INT_MAX)", function () {
            test("true", function () {
                expect(mapper.inMaxRangeIncl(INT_MAX)).toBeTruthy();
            });
        });
        describe("inRange NEG_INT_MAX, INT_MAX", function () {
            test("true", function () {
                var min = NEG_INT_MAX;
                var max = INT_MAX;
                expect(mapper.inRange(min, max)).toBeTruthy();
            });
        });
        describe("inPosNegRange(INT_MAX)", function () {
            test("true", function () {
                expect(mapper.inPosNegRange(INT_MAX)).toBeTruthy();
            });
        });
        describe("isInteger", function () {
            test("true", function () {
                expect(mapper.isInteger).toBeTruthy();
            });
        });
        describe("type", function () {
            test("is a byte", function () {
                expect(mapper.type).toEqual("integer");
            });
        });
    });
});
//# sourceMappingURL=to-number.test.js.map