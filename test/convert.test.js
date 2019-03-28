const { build } = require("../");

describe("build", () => {
  test("simple properties", () => {
    const json = {
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
          type: "number",
          required: true
        }
      },
      required: ["name"]
    };

    const results = [];
    const onResult = result => {
      console.log("received", result);
      results.push(result);
    };

    const config = { onResult };
    const mapping = build(json, config);
    console.log({ mapping, results });

    console.log("SIMPLE", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
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
    });
  });

  test("nested object", () => {
    const json = {
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

    const results = [];
    const onResult = result => {
      console.log("received", result);
      results.push(result);
    };

    const config = { onResult };
    const mapping = build(json, config);
    console.log({ mapping, results });

    console.log("NESTED", JSON.stringify(mapping, null, 2));

    expect(results[1]).toEqual({ parentName: 'dog',
    key: 'name',
    resultKey: 'dog_name',
    type: 'text' });

    expect(mapping).toEqual({
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
    });
  });
});
