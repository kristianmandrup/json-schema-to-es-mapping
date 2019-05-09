"use strict";
var SchemaEntry = require("./entry").SchemaEntry;
function createSchemaEntry(obj, config) {
    return new SchemaEntry(obj, config).toEntry();
}
module.exports = {
    createSchemaEntry: createSchemaEntry
};
//# sourceMappingURL=create-schema-entry.js.map