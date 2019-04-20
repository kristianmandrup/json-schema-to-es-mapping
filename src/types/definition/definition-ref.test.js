const { createDefinitionRefResolver } = require("./");

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

  describe("normalizedRef", () => {
    const { normalizedRef } = resolver;

    test("is car", () => {
      expect(normalizedRef).toEqual("definitions/car");
    });
  });

  describe("dotPath", () => {
    const { dotPath } = resolver;

    test("is car", () => {
      expect(dotPath).toEqual("definitions.car");
    });
  });

  describe("refName", () => {
    const { refName } = resolver;

    test("is car", () => {
      expect(refName).toEqual("car");
    });
  });

  describe("refObject", () => {
    const { refObject } = resolver;

    test("is an object with name: superCar", () => {
      expect(typeof refObject).toEqual("object");
      expect(refObject.name).toEqual("superCar");
    });
  });
});
