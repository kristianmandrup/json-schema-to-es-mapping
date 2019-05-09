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
var InfoHandler = require("../info").InfoHandler;
var _a = require("../util"), isStringType = _a.isStringType, isEmptyObj = _a.isEmptyObj;
var createTypeHandler = function (opts, config) { return new TypeHandler(opts, config); };
var TypeHandler = /** @class */ (function (_super) {
    __extends(TypeHandler, _super);
    function TypeHandler(opts, config) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, config) || this;
        var typeName = opts.typeName, entry = opts.entry, calcType = opts.calcType, type = opts.type;
        _this.opts = opts;
        _this.typeName = typeName;
        _this.entry = entry || {};
        var $calcType = function () { return type || _this.type; };
        _this.calcType = calcType || $calcType;
        _this.validate();
        return _this;
    }
    TypeHandler.prototype.validate = function () {
        if (!isStringType(this.calcType)) {
            this.error("validate", "calcType does not have sufficient info to calculate type", {
                opts: this.opts,
                calcType: this.calcType,
                type: this.type,
                typeMap: this.typeMap,
                typeName: this.typeName,
                typeValue: (this.typeMap || {})[this.typeName],
                entry: this.entry
            });
            if (isEmptyObj(this.typeMap)) {
                this.error("empty typeMap", this.typeMap);
            }
            if (isEmptyObj(this.entry)) {
                this.error("empty entry", this.entry);
            }
            if (isStringType(this.typeName)) {
                this.error("invalid or missing typeName", this.typeName);
            }
        }
    };
    Object.defineProperty(TypeHandler.prototype, "baseType", {
        get: function () {
            this.error("default mapping type must be specified by subclass");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeHandler.prototype, "typeMapValue", {
        get: function () {
            return this.typeMap[this.typeName];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeHandler.prototype, "typeMap", {
        get: function () {
            return this.config.typeMap || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeHandler.prototype, "type", {
        get: function () {
            return this.entryType || this.typeMapValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeHandler.prototype, "entryType", {
        get: function () {
            return this.entry.type;
        },
        enumerable: true,
        configurable: true
    });
    return TypeHandler;
}(InfoHandler));
module.exports = {
    createTypeHandler: createTypeHandler,
    TypeHandler: TypeHandler
};
//# sourceMappingURL=type-handler.js.map