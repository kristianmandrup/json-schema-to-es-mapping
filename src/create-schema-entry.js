const { SchemaEntry } = require("./entry");

function createSchemaEntry(key, value, config) {
  return new SchemaEntry(key, value, config).toEntry();
}

module.exports = {
  createSchemaEntry
};
