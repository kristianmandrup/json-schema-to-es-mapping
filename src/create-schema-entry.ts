import { SchemaEntry } from "./entry";

export const createSchemaEntry = (obj, config) => {
  return new SchemaEntry(obj, config).toEntry();
};
