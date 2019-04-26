const { isString, toString, MappingString } = require("./string");

const create = opts => ({
  type: "string",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return {
    key: "name",
    type: value.type,
    value,
    schema,
    config: opts.config || config
  };
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
  describe("type", () => {
    describe("default", () => {
      const obj = objFor();
      const mapper = MappingString.create(obj);

      test("is keyword", () => {
        expect(mapper.type).toEqual("keyword");
      });
    });

    describe("typeMap override: string -> text", () => {
      const config = {
        typeMap: {
          string: "text"
        }
      };
      const obj = objFor({ config });
      const mapper = MappingString.create(obj);

      test("is text", () => {
        expect(mapper.type).toEqual("text");
      });
    });
  });
});
