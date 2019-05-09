import { build } from "./build";

export const buildMappingsFor = (name, schema, config = {}) => {
  const { properties } = build(schema, config);
  return {
    mappings: {
      [name]: {
        properties
      }
    }
  };
};
