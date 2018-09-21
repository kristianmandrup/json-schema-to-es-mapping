const {SchemaEntry, SchemaEntryError} = require('./entry');

function buildMapping(schema, config = {}) {
  let {type, properties} = schema
  if (isObject(type)) {
    if (properties) {
      properties = normalizeRequired(schema)
      const propMappings = propsToMapping(properties, config)
      return {
        mappings: {
          doc: {
            properties: {
              _type_: {
                type: 'keyword'
              },
              ...propMappings
            }
          }
        }
      }
    }
  }
  throw new Error('invalid schema')
}

function isObject(type) {
  return type && type === 'object'
}

function normalizeRequired(schema) {
  const {properties, required} = schema
  return Object
    .keys(properties)
    .reduce((acc, key) => {
      const value = properties[key]
      const isRequired = required.indexOf(key) >= 0
      value.required = value.required || isRequired
      acc[key] = value
      return acc
    }, {})
}

function propsToMapping(properties, config = {}) {
  return Object
    .keys(properties)
    .reduce((acc, key) => {
      const value = properties[key]
      acc[key] = propToSchemaEntry(key, value, config)
      return acc
    }, {})
}

function propToSchemaEntry(key, value, config = {}) {
  const entryBuilder = createSchemaEntry || config.createSchemaEntry
  return entryBuilder(key, value, config)
}

function createSchemaEntry(key, value, config) {
  return new SchemaEntry(key, value, config).toEntry()
}

const types = require('./types')

module.exports = {
  buildMapping,
  createSchemaEntry,
  SchemaEntry,
  SchemaEntryError,
  types
}
