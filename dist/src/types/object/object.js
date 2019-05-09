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
var MappingBaseType = require("../base").MappingBaseType;
var _a = require("../util"), isFunction = _a.isFunction, isObject = _a.isObject, isObjectType = _a.isObjectType;
function toObject(obj) {
    return isObject(obj) && MappingObject.create(obj).convert();
}
// Allow recursive schema
var MappingObject = /** @class */ (function (_super) {
    __extends(MappingObject, _super);
    function MappingObject(obj) {
        var _this = _super.call(this, obj) || this;
        _this.properties = _this.value.properties;
        _this.typeNameFor = _this.config.typeNameFor;
        _this.objTypeName = _this.value.typeName || _this.value.className;
        return _this;
    }
    Object.defineProperty(MappingObject.prototype, "baseType", {
        get: function () {
            return "object";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingObject.prototype, "typeName", {
        get: function () {
            return "object";
        },
        enumerable: true,
        configurable: true
    });
    MappingObject.create = function (obj) {
        return new MappingObject(obj).init();
    };
    MappingObject.prototype.createMappingResult = function () {
        return this.shouldBuildValueMapping
            ? this.buildObjectValueMapping()
            : this.defaultObjectValueMapping;
    };
    Object.defineProperty(MappingObject.prototype, "shouldBuildValueMapping", {
        get: function () {
            return this.hasProperties && !this.wasCacheHit;
        },
        enumerable: true,
        configurable: true
    });
    MappingObject.prototype.createResult = function () {
        var mapping = this.createMappingResult();
        var props = mapping.properties;
        return Object.keys(props).reduce(function (acc, key) {
            if (key === "_type_")
                return acc;
            acc[key] = props[key];
            return acc;
        }, {});
    };
    MappingObject.prototype.buildObjectValueMapping = function () {
        var buildProperties = this.config.buildProperties;
        return buildProperties(this.objectValue, this.mappingConfig);
    };
    Object.defineProperty(MappingObject.prototype, "incNestingLevel", {
        get: function () {
            var nestingLevel = this.config.nestingLevel || 0;
            return nestingLevel++;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingObject.prototype, "mappingConfig", {
        get: function () {
            return __assign({ result: this.result, name: this.key, nestingLv: this.incNestingLevel, nested: true }, this.config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingObject.prototype, "resolvedTypeName", {
        get: function () {
            return this.objTypeName || this.resolveConfigTypeName(this.key);
        },
        enumerable: true,
        configurable: true
    });
    MappingObject.prototype.resolveConfigTypeName = function (name) {
        return isFunction(this.typeNameFor) && this.typeNameFor(name);
    };
    Object.defineProperty(MappingObject.prototype, "objectValue", {
        get: function () {
            return __assign({ wasCacheHit: this.wasCacheHit, parentName: this.key, typeName: this.resolvedTypeName }, this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingObject.prototype, "defaultObjectValueMapping", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingObject.prototype, "hasProperties", {
        get: function () {
            return isObjectType(this.properties);
        },
        enumerable: true,
        configurable: true
    });
    return MappingObject;
}(MappingBaseType));
module.exports = {
    isObject: isObject,
    toObject: toObject,
    MappingObject: MappingObject
};
//# sourceMappingURL=object.js.map