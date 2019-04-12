const { buildConfig } = require("./build-config");

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
