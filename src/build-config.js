const { normalizeRequired } = require("./normalize-required");
const { buildProperties } = require("./build-properties");
const { propsToMapping } = require("./props-to-mapping");
const { propToSchemaEntry } = require("./prop-to-schema-entry");

function buildConfig(config = {}, schema) {
  const builtConfig = {
    schema,
    resultObj: {},
    normalizeRequired,
    buildProperties,
    propsToMapping,
    propToSchemaEntry,
    itemResolver: propToSchemaEntry,
    ...config
  };
  return builtConfig;
}

module.exports = {
  buildConfig
};
