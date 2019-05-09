import { build } from "../..";

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
    const json = create();
    const { properties } = build(json);
    test("done", () => {
      expect(properties.done).toEqual({
        type: "boolean"
      });
    });
  });
});
