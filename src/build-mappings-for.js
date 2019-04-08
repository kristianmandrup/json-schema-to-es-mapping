const { build } = require("./build");

function buildMappingsFor(name, schema, config = {}) {
  const { properties } = build(schema, config);
  return {
    mappings: {
      [name]: {
        properties
      }
    }
  };
}

module.exports = {
  buildMappingsFor
};
