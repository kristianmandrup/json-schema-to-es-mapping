const { create, opts } = require("./helpers");

describe("create typeHandler", () => {
  describe("default", () => {
    const mapper = create(opts);
    test("is undefined before init", () => {
      expect(mapper.typeHandler).toBeUndefined();
    });

    describe("initTypeHandler", () => {
      mapper.initTypeHandler();

      test("is function", () => {
        expect(typeof mapper.typeHandler).toEqual("function");
      });
    });
  });
  describe("passed in config", () => {});
});
