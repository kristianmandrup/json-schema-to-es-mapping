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
var MappingRange = require("../range").MappingRange;
var _a = require("../util"), isNumber = _a.isNumber, safeToFloat = _a.safeToFloat, safeToInt = _a.safeToInt;
function toNumber(obj) {
    return isNumber(obj.type) && MappingNumber.create(obj).convert();
}
var INT_MAX = Math.pow(2, 31);
var NEG_INT_MAX = -(INT_MAX + 1);
var MappingNumber = /** @class */ (function (_super) {
    __extends(MappingNumber, _super);
    function MappingNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingNumber.prototype, "baseType", {
        get: function () {
            return (this.typeMap || {}).number || "float";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "typeName", {
        get: function () {
            return "number";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "calcNumericType", {
        get: function () {
            return (this.double ||
                this.halfFloat ||
                this.float ||
                this.byte ||
                this.short ||
                this.integer ||
                this.long ||
                this.baseType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "double", {
        get: function () {
            return this.isDouble && "double";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "halfFloat", {
        get: function () {
            return this.isHalfFloat && "half_float";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "float", {
        get: function () {
            return this.isFloat && "float";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "byte", {
        get: function () {
            return this.isByte && "byte";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "short", {
        get: function () {
            return this.isShort && "short";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "integer", {
        get: function () {
            return this.isInteger && "integer";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "long", {
        get: function () {
            return this.isLong && "long";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isFloating", {
        get: function () {
            return this.precision < 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isDouble", {
        get: function () {
            return this.numType === "double" || (this.isFloating && this.isLong);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isFloat", {
        get: function () {
            return this.numType === "float" || this.isFloating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isHalfFloat", {
        get: function () {
            return this.numType === "half-float" && this.isFloating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isByte", {
        get: function () {
            return this.numType === "byte" || this.inPosNegRange(127);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isShort", {
        get: function () {
            return this.numType === "short" || this.inPosNegRange(32767);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isInteger", {
        get: function () {
            return (this.numType === "int" ||
                this.numType === "integer" ||
                this.inPosNegRange(INT_MAX));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "isLong", {
        get: function () {
            return (this.numType === "long" || this.outsideRange(-(INT_MAX + 1), INT_MAX));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "precision", {
        get: function () {
            return safeToFloat(this.value.multipleOf, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "numType", {
        get: function () {
            return this.value.numType;
        },
        enumerable: true,
        configurable: true
    });
    MappingNumber.prototype.inPosNegRange = function (max) {
        var min = -(max + 1);
        return this.inRange(min, max);
    };
    Object.defineProperty(MappingNumber.prototype, "type", {
        get: function () {
            return (this.configType ||
                this.formatType ||
                this.calcNumericType ||
                this.baseType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "formatType", {
        get: function () {
            return (this.numericFormat[this.format] || this.numericFormat[this.value.type]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingNumber.prototype, "numericFormat", {
        get: function () {
            return {
                integer: "integer"
            };
        },
        enumerable: true,
        configurable: true
    });
    MappingNumber.create = function (obj) {
        return new MappingNumber(obj).init();
    };
    return MappingNumber;
}(MappingRange));
module.exports = {
    INT_MAX: INT_MAX,
    NEG_INT_MAX: NEG_INT_MAX,
    isNumber: isNumber,
    toNumber: toNumber,
    MappingNumber: MappingNumber
};
//# sourceMappingURL=number.js.map