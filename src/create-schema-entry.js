const { SchemaEntry } = require("./entry");

function createSchemaEntry(obj, config) {
  return new SchemaEntry(obj, config).toEntry();
}

module.exports = {
  createSchemaEntry
};
