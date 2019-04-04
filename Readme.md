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

const results = [];
const onResult = result => {
  console.log("received", result);
  results.push(result);
};

const config = { onResult };
const { mapping, result } = build(schema, config);
console.log({ mapping, result, results });

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

The `result` will give:

```js
{
  name: { type: 'text' },
  age: { type: 'integer' }
}
```

The `onResult` handler will populate the `results` array with the following:

```js
[ { parentName: 'Person',
    key: 'name',
    resultKey: 'name',
    type: 'text' },
  { parentName: 'Person',
    key: 'age',
    resultKey: 'age',
    type: 'integer' } ] }
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

The `result` will give:

```js
{
  name: { type: 'text' },
  dog_name: { type: 'text' },
  dog_age: { type: 'integer' },
  dog: {
    name: { type: 'text' },
    age: { type: 'integer' }
  }
}
```

If you add an `onResult` handler to receive `results`, it will look as follows:

```js
results:
  [ { parentName: 'Person',
      key: 'name',
      resultKey: 'name',
      type: 'text' },
    { parentName: 'dog',
      key: 'name',
      resultKey: 'dog_name',
      type: 'text' },
    { parentName: 'dog',
      key: 'age',
      resultKey: 'dog_age',
      type: 'integer' },
    { parentName: 'Person',
      key: 'dog',
      resultKey: 'dog',
      mappings:
      { doc:
          { properties:
            { _type_: { type: 'keyword' },
              name: { type: 'text' },
              age: { type: 'integer' } } } } } ] }
```

You can use the `results` to generate a more context specific mapping for Elastic Search context, given your requirements.

## Customization

- Type mappers
- Rules

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

  createMappingResult() {
    return this.hasProperties
      ? this.buildObjectValueMapping()
      : this.defaultObjectValueMapping;
  }

  buildObjectValueMapping() {
    const { buildMapping } = this.config;
    return buildMapping(this.objectValue, this.mappingConfig);
  }
}

module.exports = function toObject(obj) {
  return util.isObject(obj) && new MyMappingObject(obj).convert();
};
```

Import the `toObject` function and pass it in the `types` object of the `config` object passed to the `build` function.

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

Depending on your requirements, you can post-process the generated mapping to better suit your specific needs and strategies for handling nested/complex data relationships.

### Elastic Search nested objects and data

- [Elasticsearch: Nested datatype](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)
- [Elasticsearch: Nested Objects](https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-objects.html)
- [Elasticsearch data schema for nested objects](https://stackoverflow.com/questions/43488166/elasticsearch-data-schema-for-nested-objects)
- [Elasticsearch : Advanced search and nested objects](http://obtao.com/blog/2014/04/elasticsearch-advanced-search-and-nested-objects/)

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
