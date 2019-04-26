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

const toStr = opts => {
  const $opts = objFor(opts);
  return toString($opts);
};

const string = opts => {
  const $opts = objFor(opts);
  return MappingString.create($opts);
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
  describe("config", () => {
    describe("default", () => {
      const obj = objFor();
      const mapper = string(obj);

      test("is keyword", () => {
        expect(mapper.config.typeMap.string).toEqual("keyword");
      });
    });

    describe("typeMap override: string -> text", () => {
      const config = {
        typeMap: {
          string: "text"
        }
      };
      const obj = objFor({ config });
      const mapper = string(obj);

      test("is text", () => {
        expect(mapper.config.typeMap.string).toEqual("text");
      });
    });
  });

  describe("typeMap", () => {
    describe("default", () => {
      const obj = objFor();
      const mapper = string(obj);

      test("is keyword", () => {
        expect(mapper.typeMap.string).toEqual("keyword");
      });
    });

    describe("typeMap override: string -> text", () => {
      const config = {
        typeMap: {
          string: "text"
        }
      };
      const obj = objFor({ config });
      const mapper = string(obj);

      test("is text", () => {
        expect(mapper.typeMap.string).toEqual("text");
      });
    });
  });

  describe("type", () => {
    describe("default", () => {
      const obj = objFor();
      const mapper = string(obj);

      test("is keyword", () => {
        expect(mapper.type).toEqual("keyword");
      });
    });

    describe("typeMap override: string -> text", () => {
      const config = {
        typeMap: {
          string: "text",
          x: "X"
        }
      };
      const obj = objFor({ config });
      const mapper = string(obj);

      test("is text", () => {
        expect(mapper.type).toEqual("text");
      });
    });
  });
});
