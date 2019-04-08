const { build } = require("../src");

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
    const { mapping, result } = build(json, config);
    console.log({ mapping, result, results });

    console.log("SIMPLE", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
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
    });
  });
});
