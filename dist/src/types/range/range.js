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
var MappingBaseType = require("../base").MappingBaseType;
var safeToInt = require("../util").safeToInt;
var INT_MAX = Math.pow(2, 31);
var MappingRange = /** @class */ (function (_super) {
    __extends(MappingRange, _super);
    function MappingRange(opts) {
        var _this = _super.call(this, opts) || this;
        var minFn = _this.exclusiveMinimum
            ? _this.inMinRangeExcl
            : _this.inMinRangeIncl;
        _this.minFn = minFn.bind(_this);
        var maxFn = _this.exclusiveMaximum
            ? _this.inMaxRangeExcl
            : _this.inMaxRangeIncl;
        _this.maxFn = maxFn.bind(_this);
        return _this;
    }
    Object.defineProperty(MappingRange.prototype, "exclusiveMaximum", {
        get: function () {
            return this.value.exclusiveMaximum || this.value.exclMax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "maximum", {
        get: function () {
            return this.value.maximum || this.value.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "exclusiveMinimum", {
        get: function () {
            return this.value.exclusiveMinimum || this.value.exclMin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "minimum", {
        get: function () {
            return this.value.minimum || this.value.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "maxExcl", {
        get: function () {
            return safeToInt(this.exclusiveMaximum, INT_MAX - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "maxIncl", {
        get: function () {
            return safeToInt(this.maximum, INT_MAX - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "minExcl", {
        get: function () {
            return safeToInt(this.exclusiveMinimum, -INT_MAX);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingRange.prototype, "minIncl", {
        get: function () {
            return safeToInt(this.minimum, -INT_MAX);
        },
        enumerable: true,
        configurable: true
    });
    MappingRange.prototype.inMinRangeExcl = function (min) {
        return this.minExcl > min;
    };
    MappingRange.prototype.inMinRangeIncl = function (min) {
        return this.minIncl >= min;
    };
    MappingRange.prototype.inMaxRangeExcl = function (max) {
        return this.maxExcl < max;
    };
    MappingRange.prototype.inMaxRangeIncl = function (max) {
        return this.maxIncl <= max;
    };
    MappingRange.prototype.inRange = function (min, max) {
        return this.minFn(min) && this.maxFn(max);
    };
    MappingRange.prototype.outsideRange = function (min, max) {
        return !this.inRange(min, max);
    };
    return MappingRange;
}(MappingBaseType));
module.exports = {
    MappingRange: MappingRange
};
//# sourceMappingURL=range.js.map