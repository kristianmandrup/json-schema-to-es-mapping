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
var isString = require("../util").isString;
function toString(obj) {
    if (!isString(obj.type))
        return;
    var mapper = MappingString.create(obj);
    var mapping = mapper.convert();
    console.log({ mapping: mapping });
    return mapping;
}
var MappingString = /** @class */ (function (_super) {
    __extends(MappingString, _super);
    function MappingString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingString.prototype, "baseType", {
        get: function () {
            return "keyword";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingString.prototype, "typeName", {
        get: function () {
            return "string";
        },
        enumerable: true,
        configurable: true
    });
    MappingString.create = function (obj) {
        return new MappingString(obj).init();
    };
    return MappingString;
}(MappingBaseType));
module.exports = {
    isString: isString,
    toString: toString,
    MappingString: MappingString
};
//# sourceMappingURL=string.js.map