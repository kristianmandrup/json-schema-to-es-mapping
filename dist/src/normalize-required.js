"use strict";
function normalizeRequired(schema) {
    var properties = schema.properties, required = schema.required;
    required = required || [];
    return Object.keys(properties).reduce(function (acc, key) {
        var value = properties[key];
        var isRequired = required.indexOf(key) >= 0;
        value.required = value.required || isRequired;
        acc[key] = value;
        return acc;
    }, {});
}
module.exports = {
    normalizeRequired: normalizeRequired
};
//# sourceMappingURL=normalize-required.js.map