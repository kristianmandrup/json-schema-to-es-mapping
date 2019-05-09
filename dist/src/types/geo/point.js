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
var _a = require("../util"), isStringType = _a.isStringType, isString = _a.isString, isNumber = _a.isNumber;
var short = function (props) {
    return props.lat &&
        isNumber(props.lat.type) &&
        props.lng &&
        isNumber(props.lng.type);
};
var full = function (props) {
    return props.latitude &&
        isNumber(props.latitude.type) &&
        props.longitude &&
        isNumber(props.longitude.type);
};
var hasNumericItem = function (items, index) { return isNumber((items[index] || {}).type); };
var isPointArray = function (obj) {
    if (!obj)
        return false;
    if (obj.type !== "array")
        return false;
    var items = obj.items;
    return Array.isArray(items)
        ? isPointArrayItems(items)
        : isPointArrayItem(obj, items);
};
var isPointArrayItems = function (items) {
    if (items === void 0) { items = []; }
    return hasNumericItem(items, 0) && hasNumericItem(items, 1);
};
var isPointArrayItem = function (obj, items) {
    if (obj === void 0) { obj = {}; }
    if (items === void 0) { items = {}; }
    return isNumber(items.type) && obj.minItems == 2 && obj.maxItems == 2;
};
var isPointType = function (obj) {
    if (obj === void 0) { obj = {}; }
    return isString(obj.type) || isPointArray(obj);
};
var isLocationKey = function (key) { return key.match(/location/); };
var isLocationKeyAndObj = function (key, obj) {
    return isLocationKey(key) && isPointType(obj);
};
// See: https://www.elastic.co/guide/en/elasticsearch/guide/current/lat-lon-formats.html
var isGeoPoint = function (obj, key) {
    if (obj === void 0) { obj = {}; }
    obj = obj.value || obj;
    var isValidLocationKey = isStringType(key) && isLocationKeyAndObj(key, obj);
    if (isValidLocationKey)
        return true;
    var properties = obj.properties;
    if (!properties)
        return false;
    return short(properties) || full(properties);
};
function toGeoPoint(obj, key) {
    return isGeoPoint(obj, key) && MappingGeoPoint.create(obj).convert();
}
var MappingGeoPoint = /** @class */ (function (_super) {
    __extends(MappingGeoPoint, _super);
    function MappingGeoPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingGeoPoint.prototype, "baseType", {
        get: function () {
            return "geo_point";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingGeoPoint.prototype, "typeName", {
        get: function () {
            return "geo_point";
        },
        enumerable: true,
        configurable: true
    });
    MappingGeoPoint.create = function (obj) {
        return new MappingGeoPoint(obj).init();
    };
    return MappingGeoPoint;
}(MappingBaseType));
module.exports = {
    isGeoPoint: isGeoPoint,
    isPointType: isPointType,
    isPointArray: isPointArray,
    isPointArrayItem: isPointArrayItem,
    isPointArrayItems: isPointArrayItems,
    hasNumericItem: hasNumericItem,
    short: short,
    full: full,
    isLocationKey: isLocationKey,
    isLocationKeyAndObj: isLocationKeyAndObj,
    toGeoPoint: toGeoPoint,
    MappingGeoPoint: MappingGeoPoint
};
//# sourceMappingURL=point.js.map