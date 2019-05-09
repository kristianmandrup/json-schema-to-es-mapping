"use strict";
var createSchemaEntry = require("./create-schema-entry").createSchemaEntry;
function propToSchemaEntry(obj, config) {
    if (config === void 0) { config = {}; }
    var entryBuilder = createSchemaEntry || config.createSchemaEntry;
    return entryBuilder(obj, config);
}
module.exports = {
    propToSchemaEntry: propToSchemaEntry
};
//# sourceMappingURL=prop-to-schema-entry.js.map