const { SchemaEntry, SchemaEntryError } = require("./entry");
const { buildProperties } = require("./build-properties");
const { buildMappingsFor } = require("./build-mappings-for");
const { build } = require("./build");
const { createSchemaEntry } = require("./create-schema-entry");

const types = require("./types");

module.exports = {
  build,
  buildProperties,
  buildMappingsFor,
  createSchemaEntry,
  SchemaEntry,
  SchemaEntryError,
  types
};
