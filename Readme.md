# JSON Schema to ElasticSearch mappings

Convert JSON schema to [ElasticSearch mappings](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)

A mapping type has:

_Meta-fields_

Meta-fields are used to customize how a document’s metadata associated is treated. Examples of meta-fields include the document’s `_index`, `_type`, `_id`, and `_source` fields.

_Fields or properties_

A mapping `type` contains a list of fields or properties pertinent to the document.

_Field datatypes_

Each field has a data `type` which can be:

- a simple type like `text`, `keyword`, `date`, `long`, `double`, `boolean` or `ip`
- a type which supports the hierarchical nature of JSON such as `object` or `nested`
- a specialised type like `geo_point`, `geo_shape`, or `completion`

It is often useful to index the same field in different ways for different purposes. For instance, a `string` field could be indexed as a `text` field for full-text search, and as a `keyword` field for sorting or aggregations. Alternatively, you could index a string field with the `standard` analyzer, the `english` analyzer, and the `french` analyzer.

This is the purpose of multi-fields. Most datatypes support multi-fields via the `fields` parameter.

## Quick start

- npm: `npm install json-schema-to-es-mapping -S`
- yarn: `yarn add json-schema-to-es-mapping`

The easiest way to get started is to use `buildMappingsFor` to create a mappings object for a named index given a JSON schema.

```js
const mappings = buildMappingsFor("people", schema);
```

Example:

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

const { buildMappingsFor } = require("json-schema-to-es-mapping");
const mappings = buildMappingsFor("people", schema);
console.log({ mappings });
```

This will by default give the following mappings result:

```json
{
  "mappings": {
    "people": {
      "properties": {
        "name": {
          "type": "keyword"
        },
        "age": {
          "type": "integer"
        }
      }
    }
  }
}
```

The function `buildMappingsFor` uses the `build` function to return the properties map and simply wraps them with a `mappings` object for the named index.

## Supported mappings

Currently all Elastic Search core data types are supported (except for `binary`).

- string
- numeric
- boolean
- date
- object
- ranges (numeric, date) (soon)
- geo_point (soon)
- ip (soon)

Note: The most feature complete version can currently be found in the [tests](https://github.com/kristianmandrup/json-schema-to-es-mapping/tree/tests) branch. It is almost complete. Please help with the finishing touches so it can be released if you want or need these extra mappings and other features.

### Numeric

You can assist the numeric type mapper by supplying a `numType` for the field entry, such as `numType: "double"`

See ES [number](https://www.elastic.co/guide/en/elasticsearch/reference/current/number.html#number) reference for list of valid `numType`s (except for `scaled_float`)

### Ranges

- Numeric
- Date

#### Numeric ranges

To make a numeric field entry be mapped to an ES numeric range:

- Set `range: true`
- Set a minimum range value, either `minimum` or `exlusiveMinimum`
- Set a maximum range value, either `maximum` or `exlusiveMaximum`

If you leave out the `range: true` it will be resolved as a number, using the min and max values and the `multipleOf` (precision). These properties will in combination be used to determine the exact numeric type (`byte`, `short`, ... `double`) to be used in the Elastic Search numeric type mapping.

#### Date ranges

To make an entry detect as a date range, the same applies as for a number range but the entry must also resolve to a date type (see `types/util.js` function `isDate(obj)` for details)

## Recent feature additions

Now also resolves:

- Array items that are themselves object types
- References to object definitions (ie. `$ref`)
- [Parent-child mapping](https://www.elastic.co/guide/en/elasticsearch/guide/current/parent-child-mapping.html)

## Limitations and coming features

Support for Geo location mapping will likely be included in the near future. 

Please Let me know any other features you'd like to include for a more feature complete library!

Initial work to support these features have been started in the [dev](https://github.com/kristianmandrup/json-schema-to-es-mapping/tree/dev) branch and should land soon (0.4.0).

## Fine grained control

For more fine-grained control, use the `build` function directly.

```js
const { build } = require("json-schema-to-es-mapping");
const { properties, results } = build(schema);
console.log({ properties, results });
```

Will output the following Elastic Search Mapping schema:

```json
{
  "name": {
    "type": "text"
  },
  "age": {
    "type": "float"
  }
}
```

The `results` will in this (simple) case give the same results as the `mappings`:

```js
{
  name: { type: "keyword" },
  age: { type: "float" }
}
```

## Event driven approach

You can use the Event driven approach with the `onResult` and other calback handlers, to generate a more context specific mapping for Elastic Search context, given your requirements.

```js
const received = [];
const onResult = result => {
  console.log("received", result);
  received.push(result);
};

// potentially use to call resolve callback of Promise
const onComplete = fullResult => {
  console.log("ES mapping done :)", {
    fullResult, // 'internal" results
    received // list built by onResult
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

The `onResult` handler will populate the `received` array with the following:

```js
[
  { parentName: "Person", key: "name", resultKey: "name", type: "text" },
  {
    parentName: "Person",
    key: "age",
    resultKey: "age",
    type: "float"
  }
];
```

You will also get notified on:

- successful completion of JSON schema mapping via `onComplete` callback
- aborted due to processing error via `onError` callback
- aborted due to throwing exception via `onThrow` callback

The Event driven approach is entirely optional, but can be used for a more "stream like" approach. This approach works well with async promises (ie. `reject` and `resolve` callbacks).

On each result received you can then issue a command to the Elastic Search server (f.ex via the REST interface) to add a new mapping that reflects the result received.

[Put mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-put-mapping.html)

```bash
PUT person/_mapping/_doc
{
  "properties": {
    "age": {
      "type": "float"
    }
  }
}
```

Alternatively only submit the ES index mappings after `onComplete` is triggered, to make sure the full JSON schema could be processed, so that you don't end up with partial schema mappings.

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
      typeName: "Animal",
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

`buildMappingsFor` will in this case generate an Elastic Search mapping as follows:

```js
mappings: {
  people: {
    properties: {
      name: {
        type: "keyword"
      },
      dog: {
        properties: {
          name: {
            type: "keyword"
          },
          age: {
            type: "float"
          }
        }
      }
    }
  }
}
```

Note that the `dog` object results in a nested mapping (see ElasticSearch resources below)

The `results` will in this case give:

```js
{
  name: { type: 'keyword' },
  dog_name: { type: 'keyword' },
  dog_age: { type: 'float' },
  dog: {
    name: { type: 'keyword' },
    age: { type: 'float' }
  }
}
```

Notice how the dog properties are provided both in flat and nested form. Depending on your requirements, you might want to store the Elastic Search data in a more flat form than in your general application domain model.

### Customizing the result

You can pass a custom function `shouldSetResult(converter)` which controls under which converter conditions the result should be set. You can also pass:

- a custom name separator `nameSeparator`
- a `resultKey(converter)` function, to customize how result keys (names) are generated
- a `nestedKey(converter)` function, to customize how nested result keys (names) are generated

Example:

```js
const config = {
  shouldSetResult: converter => {
    return converter.type !== "object";
  },
  nameSeparator: "__" // example: dog__age
};
```

This configuration will result in results discarding the nested form, thus only retaining flattened field mappings.

```js
{
  name: { type: 'keyword' },
  dog__name: { type: 'keyword' },
  dog__age: { type: 'float' },
}
```

If you add an `onResult` handler to receive results, it will look as follows:

```js
results:
  [
    {
      parentName: 'Person',
      key: 'name',
      resultKey: 'name',
      type: 'keyword'
    },
    {
      parentName: 'dog',
      key: 'name',
      resultKey: 'dog__name',
      type: 'keyword'
    },
    { parentName: 'dog',
      key: 'age',
      resultKey: 'dog__age',
      type: 'float'
    },
    { parentName: 'Person',
      typeName: 'Animal',
      key: 'dog',
      resultKey: 'dog',
      properties: {
        name: { type: 'keyword' },
        age: { type: 'float' }
      }
    }
  ]
}
```

Note the `typeName` in the result for the `dog` fields (more on this later)

## Default configuration

The default configuration is as follows.

```js
{
  _meta_: {
    types: {
      string: "keyword",
      number: "float",
      object: "object",
      array: "nested",
      boolean: "boolean",
      date: "date"
    }
  },
  fields: {
    name: {
      type: "keyword"
    },
    content: {
      type: "text"
    },
    text: {
      type: "text"
    },
    title: {
      type: "text"
    },
    caption: {
      type: "text"
    },
    label: {
      type: "text"
    },
    tag: {
      type: "keyword",
      index:    "not_analyzed"
    }
  }
}
```

Note that some or all of these might benefit from being defined as multi fields, that are indexed and analyzed both as `text` and `keyword`.

You can pass in a custom configuration object (last argument) to override or extend it ;)

Note that for convenience, we pass in some typical field mappings based on names. Please customize this further to your needs.

## Customization

- Type mappers
- Rules

### Type mappers

You can pass in custom Type mapper factories if you want to override how specific types are mapped.

Internally this is managed in the `SchemaEntry` constructor in `entry.js`:

```js
this.defaults = {
  types: {
    string: toString,
    number: toNumber,
    boolean: toBoolean,
    array: toArray,
    object: toObject,
    date: toDate,
    dateRange: toDateRange,
    numericRange: toNumericRange
  },
  typeOrder: [
    "string",
    "dateRange",
    "numericRange",
    "number",
    "boolean",
    "array",
    "object",
    "date"
  ]
};

this.types = {
  ...this.defaults.types,
  ...(config.types || {})
};
this.typeOrder = config.typeOrder || this.defaults.typeOrder;
```

To override, simply pass in a custom `types` object and/or a custom `typeOrder` array of the precedence order they should be resolved in.

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
    const { buildProperties } = this.config;
    return buildProperties(this.objectValue, this.mappingConfig);
  }
}

module.exports = function toObject(obj) {
  return util.isObject(obj) && new MyMappingObject(obj).convert();
};
```

Import the `toObject` function and pass it in the `types` object of the `config` object passed to the `build` function.

```js
// custom implementation
const toObject = require("./toObject");

const myConfig = {
  types: {
    toObject
  }
};

// will now use the custom toObject for mapping JSON schema object to ES object
build(schema, myConfig);
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

For `array` it will use `type` of first [array item](https://cswr.github.io/JsonSchema/spec/arrays/) if [basic type](https://cswr.github.io/JsonSchema/spec/basic_types/) and the type for all array items are the same.

```js
{
  "type": "array",
  "items":{
    "type": "integer"
  }
}
```

If array item types are note "uniform" it will throw an error.

For the following array JSON schema entry the mapper will currently set the mapping type to `string` (by default). Please use the customization options outlined to define a more appropriate mapping strategy if needed.

```js
{
 "type": "array",
 "items" : [{
    "type": "string"
    // ...
  },
  {
    "type": "string"
    // ...
  },
 ]
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
};
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
```

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
const functions = {
  resolveResult: (obj) => obj.elastic;
}

const resolver = createTypeMapResolver(
  { map, functions },
  resolverConfig
);

const config = {
  entryFor: ({ parentName, typeName }) => {
    // ensure capitalized and camelized name
    const type = classify(typeName || parentName);
    const name = converter.key;
    return resolver.resolve({ type, name });
  }
};
```

Note that for `typeName` to be set, either set a `className` or `typeName` property on the object entry in the JSON schema (see `dog` example above) or alternatively provide a lookup function `typeNameFor(name)` on the config object passed in.

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

### 1.0.0

- Convert project to TypeScript
- Add unit tests for ~80% test coverage
- Improve mappings for:
  - Date range

## Author

2019 Kristian Mandrup (CTO@Tecla5)

## License

MIT
