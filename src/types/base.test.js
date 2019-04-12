const { MappingBaseType } = require("./base");

const create = (opts, config) => {
  opts.config = config;
  return new MappingBaseType(opts, config);
};

describe("definitionResolver", () => {
  const config = {};
  describe("set on config", () => {
    const definitionResolver = () => 42;
    const config = {
      definitionResolver
    };
    const obj = {
      $ref: "x"
    };
    const mapper = create(obj, config);

    test("is one from config", () => {
      expect(mapper.definitionResolver).toBe(definitionResolver);
    });
  });
  describe("default", () => {
    const obj = {
      $ref: "x"
    };
    const mapper = create(obj, config);

    test("is set", () => {
      expect(mapper.definitionResolver).toBeDefined();
    });
  });
});
