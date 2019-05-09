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
var isDate = require("../util").isDate;
function toDate(obj) {
    return isDate(obj) && MappingDate.create(obj).convert();
}
var MappingDate = /** @class */ (function (_super) {
    __extends(MappingDate, _super);
    function MappingDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingDate.prototype, "baseType", {
        get: function () {
            return "date";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingDate.prototype, "typeName", {
        get: function () {
            return "date";
        },
        enumerable: true,
        configurable: true
    });
    MappingDate.create = function (obj) {
        return new MappingDate(obj).init();
    };
    return MappingDate;
}(MappingBaseType));
module.exports = {
    isDate: isDate,
    toDate: toDate,
    MappingDate: MappingDate
};
//# sourceMappingURL=date.js.map