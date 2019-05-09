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
var normalizeRequired = require("./normalize-required").normalizeRequired;
var buildProperties = require("./build-properties").buildProperties;
var propsToMapping = require("./props-to-mapping").propsToMapping;
var propToSchemaEntry = require("./prop-to-schema-entry").propToSchemaEntry;
function buildConfig(config, schema) {
    if (config === void 0) { config = {}; }
    var builtConfig = __assign({ schema: schema, resultObj: {}, normalizeRequired: normalizeRequired,
        buildProperties: buildProperties,
        propsToMapping: propsToMapping,
        propToSchemaEntry: propToSchemaEntry, itemResolver: propToSchemaEntry }, config);
    return builtConfig;
}
module.exports = {
    buildConfig: buildConfig
};
//# sourceMappingURL=build-config.js.map