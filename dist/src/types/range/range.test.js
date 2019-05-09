"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var MappingRange = require(".").MappingRange;
var schema = {};
var config = {
    schema: schema,
    logging: true
};
var MyRange = /** @class */ (function (_super) {
    __extends(MyRange, _super);
    function MyRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MyRange.prototype, "typeName", {
        get: function () {
            return "range";
        },
        enumerable: true,
        configurable: true
    });
    return MyRange;
}(MappingRange));
var key = "level";
var create = function (opts) {
    return new MyRange({ value: __assign({ type: "number" }, opts), key: key, config: config });
};
describe("MappingRange", function () {
    describe("minIncl, maxIncl", function () {
        var range = create({ minimum: 1, maximum: 3 });
        test("minimum", function () {
            expect(range.minimum).toBe(1);
        });
        test("maximum", function () {
            expect(range.maximum).toBe(3);
        });
        test("exclusiveMinimum", function () {
            expect(range.exclusiveMinimum).toBeUndefined();
        });
        test("exclusiveMaximum", function () {
            expect(range.exclusiveMaximum).toBeUndefined();
        });
        test("inMinRangeIncl", function () {
            expect(range.inMinRangeIncl(3)).toBeFalsy();
        });
        test("inMaxRangeIncl", function () {
            expect(range.inMaxRangeIncl(3)).toBeTruthy();
        });
        test("inMaxRangeExcl", function () {
            expect(range.inMaxRangeExcl(3)).toBeFalsy();
        });
        test("inMinRangeExcl", function () {
            expect(range.inMinRangeExcl(3)).toBeFalsy();
        });
        test("minFn", function () {
            expect(range.minFn(3)).toBeFalsy();
        });
        test("maxFn", function () {
            expect(range.maxFn(3)).toBeTruthy();
        });
    });
    describe("minExcl, maxIncl", function () {
        var range = create({ exclusiveMinimum: 1, maximum: 3 });
        test("minimum", function () {
            expect(range.minimum).toBeUndefined();
        });
        test("maximum", function () {
            expect(range.maximum).toBe(3);
        });
        test("exclusiveMinimum", function () {
            expect(range.exclusiveMinimum).toBe(1);
        });
        test("exclusiveMaximum", function () {
            expect(range.exclusiveMaximum).toBeUndefined();
        });
    });
    describe("minIncl, maxExcl", function () {
        var range = create({ minimum: 1, exclusiveMaximum: 3 });
        test("minimum", function () {
            expect(range.minimum).toBe(1);
        });
        test("maximum", function () {
            expect(range.maximum).toBeUndefined();
        });
        test("exclusiveMinimum", function () {
            expect(range.exclusiveMinimum).toBeUndefined();
        });
        test("exclusiveMaximum", function () {
            expect(range.exclusiveMaximum).toEqual(3);
        });
    });
    describe("minExcl, maxExcl", function () {
        var range = create({ exclusiveMinimum: 1, exclusiveMaximum: 3 });
        test("minimum", function () {
            expect(range.minimum).toBeUndefined();
        });
        test("maximum", function () {
            expect(range.maximum).toBeUndefined();
        });
        test("exclusiveMinimum", function () {
            expect(range.exclusiveMinimum).toBe(1);
        });
        test("exclusiveMaximum", function () {
            expect(range.exclusiveMaximum).toEqual(3);
        });
    });
});
//# sourceMappingURL=range.test.js.map