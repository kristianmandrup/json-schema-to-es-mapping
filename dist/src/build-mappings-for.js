"use strict";
var build = require("./build").build;
function buildMappingsFor(name, schema, config) {
    if (config === void 0) { config = {}; }
    var _a;
    var properties = build(schema, config).properties;
    return {
        mappings: (_a = {},
            _a[name] = {
                properties: properties
            },
            _a)
    };
}
module.exports = {
    buildMappingsFor: buildMappingsFor
};
//# sourceMappingURL=build-mappings-for.js.map