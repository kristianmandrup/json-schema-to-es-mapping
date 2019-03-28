# JSON Schema to ElasticSearch mapping schema

Convert JSON schema to [ElasticSearch mapping schema](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)

Note: Made to be compatible with Elastic Search 6, using a flat index without types.

## Quick start

- npm: `npm install json-schema-to-es-mapping -S`
- yarn: `yarn add json-schema-to-es-mapping`

Use

```js
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/person.schema.json",
  title: "Person",
  description: "A person",
  type: "object",
  properties: {
    name: {
      description: "Name of the person",
      type: "string"
    },
    age: {
      description: "Age of person",
      type: "number"
    }
  },
  required: ["name"]
};

const { build } = require("json-schema-to-es-mapping");
const mapping = build(schema);

console.log({
  mapping
});
```

Will output the following Elastic Search Mapping schema:

```json
{
  "mappings": {
    "doc": {
      "properties": {
        "_type_": {
          "type": "keyword"
        },
        "name": {
          "type": "text"
        },
        "age": {
          "type": "integer"
        }
      }
    }
  }
}
```

## Nested schemas

For a nested schema of the form:

```js
{
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/person.schema.json",
  title: "Person",
  description: "A person",
  type: "object",
  properties: {
    name: {
      description: "Name of the person",
      type: "string"
    },
    dog: {
      type: "object",
      properties: {
        name: {
          description: "Name of the dog",
          type: "string",
          required: true
        },
        age: {
          description: "Age of dog",
          type: "number"
        }
      }
    }
  },
  required: ["name"]
};
```

It will generate an Elastic Search mapping as follows:

```js
mappings: {
  doc: {
    properties: {
      _type_: {
        type: "keyword"
      },
      name: {
        type: "text"
      },
      dog: {
        mappings: {
          doc: {
            properties: {
              _type_: {
                type: "keyword"
              },
              name: {
                type: "text"
              },
              age: {
                type: "integer"
              }
            }
          }
        }
      }
    }
  }
}
```

PS: Not sure if this is a correct mapping in the Elastic Search context. Please let me know ;)
I'm happy to take any PR that improves the mapping.

## Customization

### Type mappers

You can pass in custom Type mapper factories if you want to override how specific types are mapped.
Internally this is managed in the `SchemaEntry` constructor:

```js
this.types = {
  ...this.defaultTypes,
  ...(config.types || {})
};
```

#### Custom Type mapper example (object)

Create a `toObject` file loally in your project that contains your overrides

```js
const { types } = require("json-schema-to-es-mapping");
const { MappingObject, toObject, util } = types;

class MyMappingObject extends MappingObject {
  // ...override
}

module.exports = function toObject(obj) {
  return util.isObject(obj) && new MyMappingObject(obj).convert();
};
```

Import the toObject function and pass it in the `types` object of the `config` object passed to the `build` function.

````js
// custom implementation
const toObject = require('./toObject')

const myConfig = {
  types: {
    toObject
  }
}

// will now use the custom toObject for mapping JSON schema object to ES object
build(schema, myConfig)
```

### Rules

You can pass an extra configuration object with specific rules for ES mapping properties that will be merged into the resulting mapping.

```js
const config = {
  _meta_: {
    types: {
      number: "long", // to override default ES mapping data type: "integer" used for numbers
      string: "text" // to override default ES mapping data type: 'keyword' used for strings
    }
  },
  created: {
    // add extra indexing field meta data for Elastic search
    format: "strict_date_optional_time||epoch_millis"
    // ...
  },
  firstName: {
    type: "text" // make sure firstName will be a text field in ES mapping
  }
};

const { build } = require("json-schema-to-es-mapping");
const mapping = build(schema, config);
````

Also note that you can pass in many of the functions used internally, so that the internal mechanics themselves can easily be customized as needed or used as building blocks.

## ElasticSearch mapping resources

- [mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)
- [mapping-types](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)
- [removal of types](https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html)
- [nested](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)

## Testing

Uses [jest](jestjs.io/) for unit testing.

Currently not well tested. Please help add more test coverage :)

## Author

2018 Kristian Mandrup (CTO@Tecla5)

## License

MIT
