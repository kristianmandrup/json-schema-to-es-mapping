"use strict";
function propsToMapping(_a, config) {
    var parentName = _a.parentName, properties = _a.properties;
    if (config === void 0) { config = {}; }
    var propToSchemaEntry = config.propToSchemaEntry;
    var propKeys = Object.keys(properties);
    return propKeys.reduce(function (acc, key) {
        var value = properties[key];
        acc[key] = propToSchemaEntry({ parentName: parentName, key: key, value: value }, config);
        return acc;
    }, {});
}
module.exports = {
    propsToMapping: propsToMapping
};
//# sourceMappingURL=props-to-mapping.js.map