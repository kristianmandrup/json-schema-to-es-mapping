"use strict";
// TODO: check if has any date format
function hasDateContraint(obj) {
    return false;
}
function isString(type) {
    return type === "string";
}
function isFunction(fun) {
    return typeof fun === "function";
}
function isDateFormat(type) {
    return ["date", "date-time", "time"].find(function (t) { return t === type; });
}
function isDate(obj) {
    return isNumDate(obj) || isStrDate(obj);
}
function isNumDate(obj) {
    return isInteger(obj.type) && (obj.date === true || isDateFormat(obj.format));
}
function isStrDate(obj) {
    return ((obj.type === "string" && hasDateContraint(obj)) || isDateFormat(obj.format));
}
function stringify(obj) {
    return JSON.stringify(obj, null, 2);
}
function safeToFloat(num, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 1; }
    try {
        var parsed = Number.parseFloat(num);
        return Number.isNaN(parsed) ? defaultValue : parsed;
    }
    catch (err) {
        return defaultValue;
    }
}
function safeToInt(num, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 1; }
    try {
        var parsed = Number.parseInt(num);
        return Number.isNaN(parsed) ? defaultValue : parsed;
    }
    catch (err) {
        return defaultValue;
    }
}
var keysOf = function (obj) { return Object.keys(obj); };
var isEmptyObj = function (obj) { return !obj || keysOf(obj).length === 0; };
function isInteger(type) {
    return type === "integer";
}
function isStringType(val) {
    return typeof val === "string";
}
function isNumber(type) {
    return type === "number" || isInteger(type);
}
function isNumericRange(obj) {
    if (!obj.range === true)
        return false;
    var min = obj.minimum || obj.exclusiveMinimum;
    var max = obj.maximum || obj.exclusiveMaximum;
    return (isNumber(obj.type) && safeToFloat(min, false) && safeToFloat(max, false));
}
function isDateRange(obj) {
    if (!obj.range === true)
        return false;
    var min = obj.minimum || obj.exclusiveMinimum;
    var max = obj.maximum || obj.exclusiveMaximum;
    return isDate(obj.type) && safeToFloat(min, false) && safeToFloat(max, false);
}
function isObjectType(obj) {
    return obj === Object(obj);
}
function isArray(type) {
    return type === "array";
}
function isObject(obj) {
    return obj.type === "object" || obj === "object"; // && isObjectType(obj.properties)
}
function isReferenceArray(obj) {
    return isArray(obj.type) && isReference(obj);
}
function isReference(obj) {
    return obj.reference === true;
}
function isBoolean(type) {
    return type === "boolean";
}
var assign = function (variable, value) {
    variable = value;
};
var createAssign = function (map) { return function (pos, value) {
    map[pos] = value;
}; };
var assignAt = function (map, pos, value) {
    map[pos] = value;
};
/**
 * string capitalization - first letter - capital, other - lowercase.
 * @param {String} word - Word or sentence.
 */
var capitalize = function (word) {
    if (!isStringType(word)) {
        throw new Error("capitalize: Invalid text " + word);
    }
    return "" + word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
};
var _a = require("inflection"), classify = _a.classify, camelize = _a.camelize;
var camelcase = camelize;
module.exports = {
    isObject: isObject,
    isArray: isArray,
    isReference: isReference,
    isReferenceArray: isReferenceArray,
    isObjectType: isObjectType,
    isStringType: isStringType,
    isDate: isDate,
    isDateRange: isDateRange,
    isNumericRange: isNumericRange,
    isNumber: isNumber,
    isInteger: isInteger,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isString: isString,
    safeToFloat: safeToFloat,
    safeToInt: safeToInt,
    capitalize: capitalize,
    camelize: camelize,
    camelcase: camelcase,
    classify: classify,
    assign: assign,
    createAssign: createAssign,
    assignAt: assignAt,
    stringify: stringify,
    isEmptyObj: isEmptyObj,
    keysOf: keysOf
};
//# sourceMappingURL=util.js.map