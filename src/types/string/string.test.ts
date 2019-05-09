import { build } from "../../..";

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
    const json = create();
    const { properties } = build(json, config);
    const { name } = properties || { name: "" };
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
    const json = create();
    const { properties } = build(json, config);
    const { name } = properties || { name: "" };
    test("is text", () => {
      expect(name).toEqual({
        type: "text"
      });
    });
  });
});
