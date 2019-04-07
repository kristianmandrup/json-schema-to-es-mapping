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
const { mapping, result } = build(schema);
console.log({ mapping, result });
```

Will output the following Elastic Search Mapping schema:

```json
{
  "mappings": {
    "doc": {
      "properties": {
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

## Event driven approach

You can use the Event driven approach with the `onResult` and other calback handlers, to generate a more context specific mapping for Elastic Search context, given your requirements.

```js
const results = [];
const onResult = result => {
  console.log("received", result);
  results.push(result);
};

// potentially use to call resolve callback of Promise
const onComplete = fullResult => {
  console.log("ES mapping done :)", {
    fullResult, // 'internal" results
    results // list built by onResult
  });
};

// potentially use to call reject callback of Promise
const onError = errMsg => {
  console.error("ES mapping error", errMsg);
  throw errMsg;
};

// potentially use to call reject callback of Promise
const onThrow = err => throw err;
const config = { onResult, onComplete, onError, onThrow };
```

The `onResult` handler will populate the `results` array with the following:

```js
[
  { parentName: "Person", key: "name", resultKey: "name", type: "text" },
  {
    parentName: "Person",
    key: "age",
    resultKey: "age",
    type: "integer"
  }
];
```

You will also get notified on:

- successful completion of JSON schema mapping (`onComplete`)
- aborted due to processing error (`onError`)
- aborted due to throwing exception (`onThrow`)

The Event driven approach is entirely optional, but can be used for a more "stream like" approach. This approach works well with async promises (ie. `reject` and `resolve` callbacks).

On each result received you can then issue a command to the Elastic Search server (f.ex via the REST interface) to add a new mapping that reflects the result received.

[Put mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html)

```bash
PUT person/_mapping/_doc
{
  "properties": {
    "age": {
      "type": "integer"
    }
  }
}
```

Alternatively only submit the ES mapping after `onComplete` to make sure the full schema could be processed, so that you don't end up with a partial mapping.

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
      name: {
        type: "text"
      },
      dog: {
        properties: {
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

### Customizing the result

You can pass a custom function `shouldSetResult(converter)` which controls under which converter conditions the result should be set. You can also pass:

- a custom name separator `nameSeparator`
- a `resultKey(converter)` function, to customize how result keys (names) are generated
- a `nestedKey(converter)` function, to customize how nested result keys (names) are generated

```js
const config = {
  shouldSetResult: converter => {
    return converter.type !== "object";
  },
  nameSeparator: "__" // example: dog__age
};
```

This configuration will result in:

```js
{
  name: { type: 'text' },
  dog__name: { type: 'text' },
  dog__age: { type: 'integer' },
}
```

If you add an `onResult` handler to receive `results`, it will look as follows:

```js
results:
  [
    {
      parentName: 'Person',
      key: 'name',
      resultKey: 'name',
      type: 'text'
    },
    {
      parentName: 'dog',
      key: 'name',
      resultKey: 'dog__name',
      type: 'text'
    },
    { parentName: 'dog',
      key: 'age',
      resultKey: 'dog__age',
      type: 'integer'
    },
    { parentName: 'Person',
      key: 'dog',
      resultKey: 'dog',
      properties: {
        name: { type: 'text' },
        age: { type: 'integer' }
      }
    }
  ]
}
```

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

## Elastic search types

- [Elasticsearch: mapping types](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)

Core:

- String (`text`, `keyword`)
- Numeric (`long`, `integer`, `short`, `byte`, `double`, `float`, `half_float`, `scaled_float`)
- Date (`date`)
- Boolean (`boolean`)
- Binary (`binary`)
- Range (`integer_range`, `float_range`, `long_range`, `double_range`, `date_range`)

## Type mappings

The default type mappings are as follows:

- `boolean` -> `boolean`
- `object` -> `object`
- `array` -> `nested`
- `string` -> `keyword`
- `number` -> `integer`
- `date` -> `date`

For `array` it will use `type` of first [array item](https://cswr.github.io/JsonSchema/spec/arrays/) if [basic type](https://cswr.github.io/JsonSchema/spec/basic_types/)

```js
{
  "type": "array",
  "items":{
    "type": "integer"
  }
}
```

For the following array JSON schema entry the mapper will currently set the mapping type to `string` (by default). Please use the customization options outlined to define a more appropriate mapping strategy if needed.

```js
{
 "type": "array",
 "items" : [{
    "type": "string"
  },
  {
    "type": "integer"
  },
  {
  "type": "boolean"
  }]
}
```

You can override the default type mappings by passing a `types` entry with type mappings in the `_meta_` entry of `config`

```js
const config = {
  _meta_: {
    types: {
      number: "long", // use "integer" for numbers
      string: "text" // use "text" for strings
    }
  }
}
```

### Rules

You can pass an extra configuration object with specific rules for ES mapping properties that will be merged into the resulting mapping.

```js
const config = {
  _meta_: {
    types: {
      number: "long", // use "integer" for numbers
      string: "text" // use "text" for strings
    }
  },
  fields: {
    created: {
      // add extra indexing field meta data for Elastic search
      format: "strict_date_optional_time||epoch_millis"
      // ...
    },
    firstName: {
      type: "keyword" // make sure firstName will be a keyword field (exact match) in ES mapping
    }
  }
};

const { build } = require("json-schema-to-es-mapping");
const mapping = build(schema, config);
````

Also note that you can pass in many of the functions used internally, so that the internal mechanics themselves can easily be customized as needed or used as building blocks.

### Elastic Search nested objects and data

- [Elasticsearch: Nested datatype](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)
- [Elasticsearch: Nested Objects](https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-objects.html)
- [Elasticsearch data schema for nested objects](https://stackoverflow.com/questions/43488166/elasticsearch-data-schema-for-nested-objects)
- [Elasticsearch : Advanced search and nested objects](http://obtao.com/blog/2014/04/elasticsearch-advanced-search-and-nested-objects/)

## Advanced customization

To override the default mappings for certain fields, you can pass in a fields mapping entry in the `config` object as follows:

```js
const config = {
  fields: {
    timestamp: {
      type: "date",
      format: "dateOptionalTime"
    }
    // ... more custom field mappings
  }
};
```

For a more scalable customization, pass an `entryFor` function which returns custom mappings
depending on the entry being processed.

- `key`
- `resultKey` (ie. potentially nested key name)
- `parentName` name of parent entry if nested property
- `schemaValue` (entry from JSON schema being mapped)

You could f.ex use this to provide custom mappings for specific types of date fields.

```js
const config = {
  entryFor: ({ key }) => {
    if (key === "date" || key === "timestamp") {
      return {
        type: "date",
        format: "dateOptionalTime"
      };
    }
  }
};
```

### resolve type maps

You can use [resolve-type-maps](https://github.com/kristianmandrup/resolve-type-maps) to define mappings to be used across your application in various schema-like contexts:

- GraphQL schema
- Data storage (tables, colletions etc)
- Validation
- Forms
- Data Display
- Indexing (including Elastic Search)
- Mocks and fake data

```js
const fieldMap = {
  name: {
    matches: ['title', 'caption', 'label'],
    elastic: {
      type: 'string',
    }
  }
  tag: {
    matches: ['tags'],
    elastic: {
      type: 'keyword',
    }

  },
  text: {
    matches: ['description', 'content'],
    elastic: {
      type: 'text',
    }
  },
  date: {
    matches: ['date', 'timestamp'],
    elastic: {
      type: 'text',
      format: 'dateOptionalTime'
    }
  }
}

const typeMap = {
  Person: {
    matches: ['User'],
    fields: {
      dog: {
        // ...
        elastic: {
          type: 'nested',
          // ...
        }
      },
      // ...
    }
  }
}
```

Then pass an `entryFor` function in the config object to resolve the entry to be used for the ES mapping entry.

```js
import { createTypeMapResolver } from "resolve-type-maps";

const map = {
  typeMap,
  fieldMap
};

const resolverConfig = {};

const resolver = createTypeMapResolver(
  { maps, name: "elastic" },
  resolverConfig
);

const config = {
  entryFor: converter => {
    const type = capitalize(converter.parentName);
    const name = converter.key;
    return resolver.resolve({ type, name });
  }
};
```

For inner workings, see [TypeMapResolver.ts](https://github.com/kristianmandrup/resolve-type-maps/blob/master/src/lib/TypeMapResolver.ts)

The above configuration should look up the elastic mapping entry to use, based on the type/field combination in the `typeMap` first and then fall back to the field name only in the `fieldMap` if not found. On a match, it will resolve by returning entry named `elastic` in the object matching.

```js
{
  Person: {
    matches: [/User/],
    fields: {
      dog: {
        // ...
        elastic: {
          type: 'nested',
          // ...
        }
      },
    }
  }
}
```

It should match a schema (or nested schema entry) named `Person` or `User` on the `typeMap` entry `Person`. For the nested `dog` entry it should then match on the entry `dog` under `fields` and return the entry for elastic, ie:

```js
{
  type: "nested";
}
```

If no match is made in the `typeMap`, it will follow a similar strategy by lookup a match in the `fieldMap` (as per the `maps` entry passed in the `config` object when creating the `resolver`), matching only on the field name.

## ElasticSearch mapping resources

- [mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)
- [removal of types](https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html)
- [nested](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)

## Testing

Uses [jest](jestjs.io/) for unit testing.

Currently not well tested. Please help add more test coverage :)

## TODO

### 0.3.0

- Convert project to TypeScript
- Add unit tests for ~80% test coverage
- Test Array mapping type calculated correctly in various cases

## Author

2018 Kristian Mandrup (CTO@Tecla5)

## License

MIT
