const { build } = require("../../..");

const create = () => ({
  type: "object",
  properties: {
    name: {
      type: "string"
    }
  }
});

const config = {};

describe("string", () => {
  describe("default", () => {
    json = create();
    const { properties } = build(json, config);
    const { name } = properties || {};
    test("is keyword", () => {
      expect(name).toEqual({
        type: "keyword"
      });
    });
  });

  describe("meta types: string: text", () => {
    const config = {
      _meta: {
        types: {
          string: "text"
        }
      }
    };
    json = create();
    const { properties } = build(json, config);
    const { name } = properties || {};
    test("is text", () => {
      expect(name).toEqual({
        type: "text"
      });
    });
  });
});
