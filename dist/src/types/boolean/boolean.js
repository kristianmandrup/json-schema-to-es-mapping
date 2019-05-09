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
var MappingBaseType = require("./base").MappingBaseType;
var isBoolean = require("./util").isBoolean;
function toBoolean(obj) {
    return isBoolean(obj.type) && MappingBoolean.create(obj).convert();
}
var MappingBoolean = /** @class */ (function (_super) {
    __extends(MappingBoolean, _super);
    function MappingBoolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingBoolean.prototype, "baseType", {
        get: function () {
            return "boolean";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingBoolean.prototype, "typeName", {
        get: function () {
            return "boolean";
        },
        enumerable: true,
        configurable: true
    });
    MappingBoolean.create = function (obj) {
        return new MappingBoolean(obj).init();
    };
    return MappingBoolean;
}(MappingBaseType));
module.exports = {
    isBoolean: isBoolean,
    toBoolean: toBoolean,
    MappingBoolean: MappingBoolean
};
//# sourceMappingURL=boolean.js.map