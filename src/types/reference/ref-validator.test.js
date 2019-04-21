const { createRefValidator } = require("./ref-validator");

const reference = "#/definitions/car";

describe("validateRef", () => {
  const validator = createRefValidator(config);
  describe("missing reference", () => {
    test("is invalid", () => {
      expect(() => validator.validate()).toThrow();
    });
  });

  describe("invalid reference", () => {
    test("is invalid", () => {
      expect(() => validator.validate({})).toThrow();
    });
  });

  describe("valid reference", () => {
    test("is valid", () => {
      const valid = validator.validate(reference);
      expect(valid).toEqual(true);
    });
  });
});
