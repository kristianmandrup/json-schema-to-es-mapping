import { isDate, toDate, MappingDate } from "./date";

const create = opts => ({
  type: "date",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return { key: "name", type: value.type, value, schema, config };
};

const date = opts => {
  const $opts = objFor(opts);
  return toDate($opts);
};

describe("isDate", () => {
  test("type: date - true", () => {
    expect(isDate("date")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isDate("integer")).toBeTruthy();
  });

  test("type: date - false", () => {
    expect(isDate("date")).toBeFalsy();
  });
});

describe.only("MappingDate", () => {
  const obj = objFor();
  const mapper = MappingDate.create(obj);

  describe("type", () => {
    test("default: is date", () => {
      expect(mapper.type).toEqual("date");
    });
  });
});
