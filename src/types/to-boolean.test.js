const { isBoolean, toBoolean, MappingBoolean } = require("./boolean");

const create = opts => ({
  type: "boolean",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return { key: "name", type: value.type, value, schema, config };
};

const boolean = opts => {
  const $opts = objFor(opts);
  return toBoolean($opts);
};

describe("isBoolean", () => {
  test("type: boolean - true", () => {
    expect(isboolean("boolean")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isboolean("integer")).toBeTruthy();
  });

  test("type: boolean - false", () => {
    expect(isboolean("boolean")).toBeFalsy();
  });
});

describe.only("MappingBoolean", () => {
  const obj = objFor();
  const mapper = MappingBoolean.create(obj);

  describe("type", () => {
    test("default: is boolean", () => {
      expect(mapper.type).toEqual("boolean");
    });
  });
});
