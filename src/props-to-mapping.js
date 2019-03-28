function propsToMapping(properties, config = {}) {
  const { propToSchemaEntry } = config;
  const propKeys = Object.keys(properties);
  return propKeys.reduce((acc, key) => {
    const value = properties[key];
    acc[key] = propToSchemaEntry(key, value, config);
    return acc;
  }, {});
}

module.exports = {
  propsToMapping
};
