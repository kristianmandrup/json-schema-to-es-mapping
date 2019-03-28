const { createSchemaEntry } = require("./create-schema-entry");

function propToSchemaEntry(obj, config = {}) {
  const entryBuilder = createSchemaEntry || config.createSchemaEntry;
  return entryBuilder(obj, config);
}

module.exports = {
  propToSchemaEntry
};
