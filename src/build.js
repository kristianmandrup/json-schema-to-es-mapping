const { normalizeRequired } = require("./normalize-required");
const { buildMapping } = require("./build-mapping");
const { propsToMapping } = require("./props-to-mapping");
const { propToSchemaEntry } = require("./prop-to-schema-entry");

function buildConfig(config) {
  return {
    resultObj: {},
    normalizeRequired,
    buildMapping,
    propsToMapping,
    propToSchemaEntry,
    ...config
  };
}

function build(schema, config = {}) {
  const { onComplete, onThrow } = config;
  try {
    config = buildConfig(config);
    mapping = config.buildMapping(schema, config);
    result = config.resultObj;
    onComplete && onComplete(result);
    return {
      mapping,
      result
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
