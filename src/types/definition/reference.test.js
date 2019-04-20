const { createReference } = require("./");

describe("Reference", () => {
  describe("name", () => {
    const { name } = resolver;

    test("is superCar", () => {
      expect(name).toEqual("superCar");
    });
  });

  describe.skip("typeName", () => {
    const { typeName } = resolver;

    test("is SuperCar", () => {
      expect(typeName).toEqual("SuperCar");
    });
  });
});
