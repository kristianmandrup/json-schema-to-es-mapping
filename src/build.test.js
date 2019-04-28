const { build } = require("./build");

describe("build", () => {
  const schema = {
    title: "person",
    type: "object",
    properties: {
      name: {
        type: "string"
      }
    }
  };

  describe("properties", () => {
    const built = build(schema, { schema });
    const { properties } = built;
    test("name: keyword", () => {
      expect(properties).toEqual({
        name: {
          type: "keyword"
        }
      });
    });
  });
  describe("onComplete", () => {
    test("received", done => {
      onComplete = res => {
        expect(res).toEqual({});
        done();
      };

      const built = build(schema, { schema, onComplete });
    });
  });

  describe("onThrow", () => {
    test("throws", done => {
      const schema = {
        title: "person",
        type: "unknown"
      };

      onThrow = err => {
        console.log({ err });
        expect(err).toBeDefined();
        done();
      };

      expect(() => build(schema, { schema, onThrow })).toThrow();
    });
  });
});
