const { build } = require("../src");

describe("array", () => {
  test("parent-child items", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friends: {
          description: "Names of friends",
          type: "array",
          reference: true, // ensure parent-child
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            }
          }
        }
      }
    };

    const config = {};
    const { properties } = build(json, config);
    expect(properties).toEqual({
      friends: {
        _parent: { type: 'person' },
        _source: { enabled: true },
        _all: { enabled: false }
      }
    });
  });
});