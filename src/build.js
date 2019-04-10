const { normalizeRequired } = require("./normalize-required");
const { buildProperties } = require("./build-properties");
const { propsToMapping } = require("./props-to-mapping");
const { propToSchemaEntry } = require("./prop-to-schema-entry");

function buildConfig(config, schema) {
  return {
    schema,
    resultObj: {},
    normalizeRequired,
    buildProperties,
    propsToMapping,
    propToSchemaEntry,
    ...config
  };
}

function build(schema, config = {}) {
  const { onComplete, onThrow } = config;
  try {
    config = buildConfig(config, schema);
    properties = config.buildProperties(schema, config);
    results = config.resultObj;
    onComplete && onComplete(results);
    return {
      properties,
      results
    };
  } catch (err) {
    onThrow && onThrow(err);
    throw err;
  }
}

module.exports = {
  build,
  buildConfig
};
