import { isBoolean, toBoolean, MappingBoolean } from "./boolean";

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
    expect(isBoolean("boolean")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isBoolean("integer")).toBeTruthy();
  });

  test("type: boolean - false", () => {
    expect(isBoolean("boolean")).toBeFalsy();
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
