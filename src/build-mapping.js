const { isObject, isFunction } = require("./types/util");

function error(msg, data) {
  data ? console.error(msg, data) : console.error(msg);
  throw new Error(msg);
}

const defaults = {
  error
};

function buildMapping(schema, config = {}) {
  let { type, properties } = schema;
  const error = config.error || defaults.error;

  const { normalizeRequired, propsToMapping } = config;
  if (!isFunction(normalizeRequired)) {
    error("missing normalizeRequired function in config", config);
  }
  if (!isFunction(propsToMapping)) {
    error("missing propsToMapping function in config", config);
  }

  if (!isObject(schema)) {
    error(`invalid schema: type must be object, was: ${type}`, type);
  }
  if (!properties) {
    error(`invalid schema, missing properties`, { schema, properties });
  }
  properties = normalizeRequired(schema);
  const propMappings = propsToMapping(properties, config);
  return {
    mappings: {
      doc: {
        properties: {
          _type_: {
            type: "keyword"
          },
          ...propMappings
        }
      }
    }
  };
  error(`invalid schema: ${type}`, schema);
}

module.exports = {
  buildMapping
};
