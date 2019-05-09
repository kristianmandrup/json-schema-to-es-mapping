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
var types = require("./types");
var toString = types.toString, toNumber = types.toNumber, toBoolean = types.toBoolean, toArray = types.toArray, toObject = types.toObject, toDate = types.toDate, toIp = types.toIp, toGeoPoint = types.toGeoPoint, toNumericRange = types.toNumericRange, toDateRange = types.toDateRange, obj = types.obj, chooseObjMapper = types.chooseObjMapper, AnyOfMapper = types.AnyOfMapper;
var InfoHandler = require("./types/info").InfoHandler;
var _a = require("./types/util"), isFunction = _a.isFunction, isStringType = _a.isStringType, isObjectType = _a.isObjectType;
var SchemaEntryError = /** @class */ (function (_super) {
    __extends(SchemaEntryError, _super);
    function SchemaEntryError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SchemaEntryError;
}(Error));
var createSchemaEntry = function (obj, config) { return new SchemaEntry(obj, config); };
var SchemaEntry = /** @class */ (function (_super) {
    __extends(SchemaEntry, _super);
    function SchemaEntry(obj, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        var parentName = obj.parentName, key = obj.key, value = obj.value;
        _this.parentName = parentName;
        _this.key = key;
        _this.value = value;
        _this.config = config;
        _this.type = value.type;
        _this.typeMappers = __assign({}, _this.defaults.typeMappers, (config.typeMappers || {}));
        _this.typeOrder = config.typeOrder || _this.defaults.typeOrder;
        _this.typeObjMapperFor = config.typeObjMapperFor || chooseObjMapper;
        return _this;
    }
    SchemaEntry.prototype.typeMapperFor = function (type) {
        return this.typeMappers[type];
    };
    Object.defineProperty(SchemaEntry.prototype, "defaults", {
        get: function () {
            return {
                typeMappers: this.defaultTypeMappers,
                typeOrder: this.defaultTypeOrder
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEntry.prototype, "defaultTypeMappers", {
        get: function () {
            return {
                ip: toIp,
                point: toGeoPoint,
                string: toString,
                number: toNumber,
                boolean: toBoolean,
                array: toArray,
                object: toObject,
                date: toDate,
                dateRange: toDateRange,
                numericRange: toNumericRange
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEntry.prototype, "defaultTypeOrder", {
        get: function () {
            return [
                "ip",
                "point",
                "string",
                "dateRange",
                "numericRange",
                "number",
                "boolean",
                "array",
                "object",
                "date"
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEntry.prototype, "isValidSchema", {
        get: function () {
            return this.isValidStringSchemaType || this.isValidObjSchemaType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEntry.prototype, "isValidStringSchemaType", {
        get: function () {
            return isStringType(this.type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SchemaEntry.prototype, "isValidObjSchemaType", {
        get: function () {
            return isObjectType(this.type);
        },
        enumerable: true,
        configurable: true
    });
    SchemaEntry.prototype.toEntry = function () {
        var type = this.type;
        if (!this.isValidSchema) {
            this.error("toEntry", "Not a valid schema: type " + type, {
                value: this.value
            });
        }
        return isStringType(type)
            ? this.toEntryStringType(type)
            : this.toEntryObjType(type);
    };
    SchemaEntry.prototype.toEntryObjType = function (type) {
        type = type || this.type;
        if (!this.isValidObjSchemaType) {
            this.error("toEntryObjType", "Not a valid schema: type " + type, {
                value: this.value
            });
        }
        var keys = Object.keys(type);
        var key = keys[0];
        var mapperFn = this.typeObjMapperFor(key);
        if (!isFunction(mapperFn)) {
            this.error("toEntryObjType", "Invalid type obj key " + key, {
                mapperFn: mapperFn,
                key: key,
                typeObj: this.typeObj
            });
        }
        foundValue = mapperFn(this.obj, { key: this.key, type: type });
        return foundValue;
    };
    SchemaEntry.prototype.toEntryStringType = function (type) {
        var _this = this;
        type = type || this.type;
        if (!this.isValidStringSchemaType) {
            this.error("toEntryStringType", "Not a valid schema: type " + type, {
                value: this.value
            });
        }
        var foundValue;
        this.typeOrder.find(function (type) {
            var typeFn = _this.typeMapperFor(type);
            if (!typeFn) {
                _this.info("toEntryStringType", "skipped " + type);
                return false;
            }
            if (!isFunction(typeFn)) {
                _this.error("toEntryStringType", "Invalid type function " + type, {
                    typeFn: typeFn,
                    type: type,
                    typeOrder: _this.typeOrder
                });
            }
            foundValue = typeFn(_this.obj, _this.key);
            return foundValue;
        });
        return foundValue || this.defaultTypeHandler(config);
    };
    Object.defineProperty(SchemaEntry.prototype, "obj", {
        get: function () {
            return {
                parentName: this.parentName,
                key: this.key,
                value: this.value,
                type: this.type,
                config: this.config
            };
        },
        enumerable: true,
        configurable: true
    });
    SchemaEntry.prototype.defaultTypeHandler = function (config) {
        this.error("No type matched for type: " + this.type, {
            obj: this.obj,
            config: config
        });
    };
    return SchemaEntry;
}(InfoHandler));
module.exports = {
    SchemaEntryError: SchemaEntryError,
    createSchemaEntry: createSchemaEntry,
    SchemaEntry: SchemaEntry
};
//# sourceMappingURL=entry.js.map