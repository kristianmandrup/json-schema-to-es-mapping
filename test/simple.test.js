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

    const received = [];
    const onResult = result => {
      console.log("received", result);
      received.push(result);
    };

    const config = { onResult };
    const { properties, results } = build(json, config);
    console.log({ properties, received, results });

    console.log("SIMPLE", JSON.stringify(properties, null, 2));

    expect(received[1]).toEqual({
      key: "age",
      parentName: "Person",
      resultKey: "age",
      schemaValue: {
        description: "Age of person",
        required: true,
        type: "number"
      },
      type: "float"
    });
    expect(results).toEqual({
      age: { type: "float" },
      name: { type: "keyword" }
    });
    expect(properties).toEqual({
      name: {
        type: "keyword"
      },
      age: {
        type: "float"
      }
    });
  });
});
