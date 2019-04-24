const { isObject, toObject, MappingObject } = require("./object");

const create = opts => ({
  type: "object",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return { key: "person", type: value.type, value, schema, config };
};

const object = opts => {
  const $opts = objFor(opts);
  return toObject($opts);
};

describe("isObject", () => {
  test("type: object - true", () => {
    expect(isobject("object")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isobject("integer")).toBeTruthy();
  });

  test("type: object - false", () => {
    expect(isobject("object")).toBeFalsy();
  });
});

describe.only("MappingObject", () => {
  const obj = objFor();
  const mapper = MappingObject.create(obj);

  describe("type", () => {
    test("default: is object", () => {
      expect(mapper.type).toEqual("object");
    });
  });
});
