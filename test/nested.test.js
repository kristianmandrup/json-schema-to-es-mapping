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

    const received = [];
    const onResult = result => {
      console.log("received", result);
      received.push(result);
    };

    const config = { onResult };
    const { properties, results } = build(json, config);
    console.log({ properties, received, results });

    console.log("NESTED", JSON.stringify(properties, null, 2));

    expect(results).toEqual({
      dog: { age: { type: "float" }, name: { type: "keyword" } },
      dog_age: { type: "float" },
      dog_name: { type: "keyword" },
      name: { type: "keyword" }
    });

    expect(received[1]).toEqual({
      parentName: "dog",
      key: "name",
      resultKey: "dog_name",
      schemaValue: {
        description: "Name of the dog",
        required: true,
        type: "string"
      },
      type: "keyword"
    });

    expect(properties).toEqual({
      name: {
        type: "keyword"
      },
      dog: {
        type: "object",
        properties: {
          name: {
            type: "keyword"
          },
          age: {
            type: "float"
          }
        }
      }
    });
  });
});
