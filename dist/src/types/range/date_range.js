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
var isDateRange = require("../util").isDateRange;
function toDateRange(obj) {
    return isDateRange(obj) && MappingDateRange.create(obj).convert();
}
// date_range
var MappingDateRange = /** @class */ (function (_super) {
    __extends(MappingDateRange, _super);
    function MappingDateRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingDateRange.prototype, "baseType", {
        get: function () {
            return "date_range";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingDateRange.prototype, "type", {
        get: function () {
            return this.baseType;
        },
        enumerable: true,
        configurable: true
    });
    return MappingDateRange;
}(MappingRange));
module.exports = {
    toDateRange: toDateRange,
    MappingDateRange: MappingDateRange
};
//# sourceMappingURL=date_range.js.map