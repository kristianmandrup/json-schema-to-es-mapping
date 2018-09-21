# JSON Schema to ElasticSearch mapping schema

[![Greenkeeper badge](https://badges.greenkeeper.io/kristianmandrup/json-schema-to-es-mapping.svg)](https://greenkeeper.io/)

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

const { buildMapping } = require("json-schema-to-es-mapping");
const mapping = buildMapping(schema);

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

## Customization

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

const { buildMapping } = require("json-schema-to-es-mapping");
const mapping = buildMapping(schema, config);
```

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
