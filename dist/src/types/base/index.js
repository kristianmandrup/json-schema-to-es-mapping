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
var merge = require("merge");
var InfoHandler = require("../info").InfoHandler;
var $default = require("../default").$default;
var isObjectType = require("../util").isObjectType;
var createComposer = require("./composer").createComposer;
var MappingBaseType = /** @class */ (function (_super) {
    __extends(MappingBaseType, _super);
    function MappingBaseType(opts, config) {
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, config || opts.config) || this;
        var parentName = opts.parentName, schema = opts.schema, key = opts.key, _a = opts.value, value = _a === void 0 ? {} : _a;
        config = config || opts.config || {};
        _this.opts = opts;
        _this.parentName = parentName;
        _this.schema = schema || config.schema;
        _this.key = key;
        _this.format = value.format;
        _this.result = config.result || {};
        _this.visitedPaths = config.visitedPaths || {};
        _this.config = merge.recursive($default.config, config);
        config = _this.config;
        _this.value = value;
        // TODO: make configurable by passing via config
        _this.nested = config.nested;
        _this.nestingLv = config.nestingLv;
        return _this;
    }
    MappingBaseType.prototype.init = function () {
        // this.validateSchema();
        // use Composer to compose
        this.composer = this.createComposer(__assign({ target: this, type: this.type }, this.opts));
        this.composer.init();
        this.resolveValue();
        return this;
    };
    MappingBaseType.prototype.createComposer = function (opts) {
        if (opts === void 0) { opts = {}; }
        var $createComposer = this.config.createComposer || createComposer;
        return $createComposer(opts, this.config);
    };
    MappingBaseType.prototype.resolveValue = function () {
        var value = this.value;
        this.value = this.resolve(value);
    };
    Object.defineProperty(MappingBaseType.prototype, "calculatedType", {
        get: function () {
            return this.typeHandler.calcType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingBaseType.prototype, "type", {
        get: function () {
            return this.calculatedType || this.baseType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingBaseType.prototype, "typeMap", {
        get: function () {
            return this.typeHandler.typeMap || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingBaseType.prototype, "typeName", {
        get: function () {
            this.error("typeName must be specified by subclass");
        },
        enumerable: true,
        configurable: true
    });
    MappingBaseType.prototype.dispatch = function () {
        this.dispatcher.dispatch(this.dispatchObj);
    };
    MappingBaseType.prototype.convert = function () {
        this.createAndStoreResult();
        return this.createMappingResult();
    };
    MappingBaseType.prototype.createMappingResult = function () {
        return this.resultHandler.createMappingResult();
    };
    MappingBaseType.prototype.createAndStoreResult = function () {
        this.resultHandler.createAndStoreResult();
    };
    Object.defineProperty(MappingBaseType.prototype, "resolvedResult", {
        get: function () {
            return this.resultHandler.result;
        },
        enumerable: true,
        configurable: true
    });
    MappingBaseType.prototype.resolve = function (obj) {
        if (!isObjectType(obj)) {
            this.error("resolve", "Missing or invalid object", {
                obj: obj
            });
        }
        var resolved = this.referenceResolver.resolve(obj);
        this.wasCacheHit = this.referenceResolver.wasCacheHit;
        // this.resolved = resolved
        return resolved;
    };
    return MappingBaseType;
}(InfoHandler));
module.exports = {
    MappingBaseType: MappingBaseType
};
//# sourceMappingURL=index.js.map