const { build } = require("../..");

const create = () => ({
  type: "object",
  properties: {
    done: {
      type: "boolean"
    }
  }
});

describe("boolean", () => {
  describe("only min, no max", () => {
    json = create();
    const { properties } = build(json);
    test("done", () => {
      expec(properties.done).toEqual({
        type: "boolean"
      });
    });
  });
});
