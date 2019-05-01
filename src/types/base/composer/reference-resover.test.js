const { create, opts } = require("./helpers");

describe("create referenceResolver", () => {
  describe("default", () => {
    const mapper = create(opts);
    test("is undefined before init", () => {
      expect(mapper.referenceResolver).toBeUndefined();
    });

    describe("initReferenceResolver", () => {
      describe("initialized", () => {
        mapper.initResultHandler();

        test("is function", () => {
          expect(typeof mapper.referenceResolver).toEqual("function");
        });
      });
    });
  });
  describe("passed in config", () => {});
});
