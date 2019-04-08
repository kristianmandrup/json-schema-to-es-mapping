const { build } = require("../");

describe("build", () => {
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
    const { mapping, result } = build(json, config);
    console.log({ mapping, result, results });

    console.log("NESTED", JSON.stringify(mapping, null, 2));

    expect(results[1]).toEqual({
      parentName: "dog",
      key: "name",
      resultKey: "dog_name",
      schemaValue: {
        description: "Name of the dog",
        required: true,
        type: "string"
      },
      type: "text"
    });

    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            name: {
              type: "text"
            },
            dog: {
              type: "object",
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
    });
  });
});
