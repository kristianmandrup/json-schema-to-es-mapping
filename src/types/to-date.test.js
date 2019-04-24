const { isDate, toDate, MappingDate } = require("./date");

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
    expect(isdate("date")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isdate("integer")).toBeTruthy();
  });

  test("type: date - false", () => {
    expect(isdate("date")).toBeFalsy();
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
