"use strict";
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
var _a = require("./types/util"), isObject = _a.isObject, isFunction = _a.isFunction, camelcase = _a.camelcase;
function error(msg, data) {
    data ? console.error(msg, data) : console.error(msg);
    throw new Error(msg);
}
var defaults = {
    error: error
};
function buildProperties(schema, config) {
    if (config === void 0) { config = {}; }
    var type = schema.type, properties = schema.properties;
    var error = config.error || defaults.error;
    var normalizeRequired = config.normalizeRequired, propsToMapping = config.propsToMapping;
    if (!isFunction(normalizeRequired)) {
        error("missing normalizeRequired function in config", config);
    }
    if (!isFunction(propsToMapping)) {
        error("missing propsToMapping function in config", config);
    }
    if (!isObject(schema)) {
        error("invalid schema: type must be object, was: " + type, type);
    }
    if (!properties) {
        error("invalid schema, missing properties", { schema: schema, properties: properties });
    }
    properties = normalizeRequired(schema);
    var $parentName = schema.name || schema.parentName || schema.title || config.name;
    var parentName = $parentName ? camelcase($parentName, true) : "";
    var propMappings = propsToMapping({ parentName: parentName, properties: properties }, config);
    if (schema.parentName || config.nested) {
        return {
            type: "object",
            properties: __assign({}, propMappings)
        };
    }
    return propMappings;
}
module.exports = {
    buildProperties: buildProperties
};
//# sourceMappingURL=build-properties.js.map