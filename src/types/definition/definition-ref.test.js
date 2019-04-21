const { createDefinitionRefResolver } = require("./definition-ref");

describe("DefinitionRefResolver", () => {
  const reference = "#/definitions/car";
  const schema = {
    definitions: {
      car: {
        type: "object",
        name: "superCar",
        properties: {}
      }
    }
  };
  const config = {};

  const opts = { schema };

  const resolver = createDefinitionRefResolver(opts, config);
  resolver.reference = reference;

  describe("refObjectFor", () => {
    const obj = resolver.refObjectFor(reference);

    test("resolves to referenced object", () => {
      expect(obj).toEqual({});
    });
  });

  describe("validateSchema", () => {
    describe("missing schema", () => {
      test("is invalid", () => {
        expect(() => resolver.validateSchema()).toThrow();
      });
    });

    describe("bad schema", () => {
      resolver.schema = "x";
      test("is invalid", () => {
        expect(() => resolver.validateSchema()).toThrow();
      });
    });

    describe("valid schema", () => {
      test("is valid", () => {
        resolver.schema = {};
        expect(() => resolver.validateSchema()).toThrow();
      });
    });
  });
  describe("validateRef", () => {
    describe("missing reference", () => {
      test("is invalid", () => {
        expect(() => resolver.validateRef()).toThrow();
      });
    });

    describe("invalid reference", () => {
      test("is invalid", () => {
        expect(() => resolver.validateRef({})).toThrow();
      });
    });

    describe("valid reference", () => {
      test("is valid", () => {
        const valid = resolver.validateRef(reference);
        expect(valid).toEqual(true);
      });
    });
  });
});
