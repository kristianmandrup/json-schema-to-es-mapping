const { isArray, toArray, MappingArray } = require(".");

const create = opts => ({
  type: "array",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return { key: "name", type: value.type, value, schema, config };
};

const array = opts => {
  const $opts = objFor(opts);
  return toArray($opts);
};

describe("isArray", () => {
  test("type: array - true", () => {
    expect(isarray("array")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isarray("integer")).toBeTruthy();
  });

  test("type: array - false", () => {
    expect(isarray("array")).toBeFalsy();
  });
});

describe.only("MappingArray", () => {
  const obj = objFor();
  const mapper = MappingArray.create(obj);

  describe("type", () => {
    test("default: is array", () => {
      expect(mapper.type).toEqual("nested");
    });
  });
});
