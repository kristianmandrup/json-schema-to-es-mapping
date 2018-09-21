const {buildMapping} = require('../');

test('converts JSON schema to ElasticSearch Mapping Schema', () => {
  const json = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/person.schema.json",
    "title": "Person",
    "description": "A person",
    "type": "object",
    "properties": {
      "name": {
        "description": "Name of the person",
        "type": "string"
      },
      "age": {
        "description": "Age of person",
        "type": "number",
        required: true
      }
    },
    "required": ["name"]
  }

  const mapping = buildMapping(json)
  console.log(JSON.stringify(mapping, null, 2))
  expect(mapping).toEqual({
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
  })
});
