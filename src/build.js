const { normalizeRequired } = require("./normalize-required");
const { buildMapping } = require("./build-mapping");
const { propsToMapping } = require("./props-to-mapping");
const { propToSchemaEntry } = require("./prop-to-schema-entry");

function buildConfig(config) {
  return {
    normalizeRequired,
    buildMapping,
    propsToMapping,
    propToSchemaEntry,
    ...config
  };
}

function build(schema, config = {}) {
  config = buildConfig(config);
  return config.buildMapping(schema, config);
}

module.exports = {
  build,
  buildConfig
};
