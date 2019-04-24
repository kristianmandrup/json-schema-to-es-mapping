const { isString, toString, MappingString } = require("./string");

const create = opts => ({
  type: "string",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return { key: "name", type: value.type, value, schema, config };
};

const string = opts => {
  const $opts = objFor(opts);
  return toString($opts);
};

describe("isString", () => {
  test("type: string - true", () => {
    expect(isstring("string")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isstring("integer")).toBeTruthy();
  });

  test("type: string - false", () => {
    expect(isstring("string")).toBeFalsy();
  });
});

describe.only("MappingString", () => {
  const obj = objFor();
  const mapper = MappingString.create(obj);

  describe("type", () => {
    test("default: is string", () => {
      expect(mapper.type).toEqual("keyword");
    });
  });
});
