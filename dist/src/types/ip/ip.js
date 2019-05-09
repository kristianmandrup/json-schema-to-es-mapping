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
var isString = require("./util").isString;
var isIpKey = function (name) { return [/^ip/].find(function (expr) { return expr.test(name); }); };
var isIp = function (obj, key) {
    return isString(obj.type) && isIpKey(obj.key || key);
};
function toIp(obj) {
    return isIp(obj) && MappingIp.create(obj).convert();
}
var MappingIp = /** @class */ (function (_super) {
    __extends(MappingIp, _super);
    function MappingIp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingIp.prototype, "baseType", {
        get: function () {
            return "ip";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingIp.prototype, "typeName", {
        get: function () {
            return "ip";
        },
        enumerable: true,
        configurable: true
    });
    MappingIp.create = function (obj) {
        return new MappingIp(obj).init();
    };
    return MappingIp;
}(MappingBaseType));
module.exports = {
    isIpKey: isIpKey,
    isIp: isIp,
    toIp: toIp,
    MappingIp: MappingIp
};
//# sourceMappingURL=ip.js.map