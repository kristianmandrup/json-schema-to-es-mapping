const { build } = require("../src");

describe("array", () => {
  test("no items", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friendNames: {
          description: "Names of friends",
          type: "array"
        }
      }
    };

    const config = {};
    const { mapping } = build(json, config);
    // console.log({ mapping });
    // console.log("Array - no items", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            friendNames: {
              type: "nested"
            }
          }
        }
      }
    });
  });

  test("empty items", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friendNames: {
          description: "Names of friends",
          type: "array",
          items: {}
        }
      }
    };

    const config = {};
    const { mapping } = build(json, config);
    console.log({ mapping });

    console.log("Array - no items", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            friendNames: {
              type: "nested"
            }
          }
        }
      }
    });
  });

  test("empty items", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friendNames: {
          description: "Names of friends",
          type: "array",
          items: {}
        }
      }
    };

    const config = {};
    const { mapping } = build(json, config);
    // console.log({ mapping });
    // console.log("Array - empty items", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            friendNames: {
              type: "nested"
            }
          }
        }
      }
    });
  });

  test("items object - string type", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friendNames: {
          description: "Names of friends",
          type: "array",
          items: {
            type: "string"
          }
        }
      }
    };

    const config = {
      _meta_: {
        types: {
          string: "string"
        }
      }
    };

    const { mapping } = build(json, config);
    // console.log({ mapping });
    // console.log("Array - empty items", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            friendNames: {
              type: "string"
            }
          }
        }
      }
    });
  });

  test("items array - one item string type", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friendNames: {
          description: "Names of friends",
          type: "array",
          items: [
            {
              type: "string"
            }
          ]
        }
      }
    };

    const config = {
      _meta_: {
        types: {
          string: "text"
        }
      }
    };
    const { mapping } = build(json, config);
    // console.log({ mapping });
    // console.log("Array - empty items", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            friendNames: {
              type: "text"
            }
          }
        }
      }
    });
  });

  test("items array - two items string and number type", () => {
    const json = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/person.schema.json",
      title: "Person",
      description: "A person",
      type: "object",
      properties: {
        friendNames: {
          description: "Names of friends",
          type: "array",
          items: [
            {
              type: "string"
            },
            {
              type: "number"
            }
          ]
        }
      }
    };

    const config = {};
    const { mapping } = build(json, config);
    // console.log({ mapping });
    // console.log("Array - empty items", JSON.stringify(mapping, null, 2));
    expect(mapping).toEqual({
      mappings: {
        doc: {
          properties: {
            friendNames: {
              type: "keyword"
            }
          }
        }
      }
    });
  });
});
