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
var MappingNumber = require("./number").MappingNumber;
var isNumericRange = require("./util").isNumericRange;
function toNumericRange(obj) {
    return isNumericRange(obj) && MappingNumericRange.create(obj).convert();
}
// integer_range, float_range, long_range, double_range
var MappingNumericRange = /** @class */ (function (_super) {
    __extends(MappingNumericRange, _super);
    function MappingNumericRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingNumericRange.prototype, "baseType", {
        get: function () {
            return this._types.range || "float_range";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumericRange.prototype, "type", {
        get: function () {
            return this.rangeMap[this.numericType] || this.baseType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumericRange.prototype, "rangeMap", {
        get: function () {
            return {
                byte: "integer_range",
                short: "integer_range",
                integer: "integer_range",
                long: "long_range",
                float: "float_range",
                half_float: "float_range",
                double: "double_range"
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumericRange.prototype, "numericType", {
        get: function () {
            return this.configType || this.calcNumericType || this.baseType;
        },
        enumerable: true,
        configurable: true
    });
    return MappingNumericRange;
}(MappingNumber));
module.exports = {
    toNumericRange: toNumericRange,
    MappingNumericRange: MappingNumericRange
};
//# sourceMappingURL=num_range.js.map