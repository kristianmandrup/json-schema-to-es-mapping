const { createSchemaEntry } = require("./create-schema-entry");

function propToSchemaEntry(key, value, config = {}) {
  const entryBuilder = createSchemaEntry || config.createSchemaEntry;
  return entryBuilder(key, value, config);
}

module.exports = {
  propToSchemaEntry
};
