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

  describe("typeMap: string: text", () => {
    const config = {
      typeMap: {
        string: "text"
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
