const { create, opts } = require("./helpers");

describe("create referenceResolver", () => {
  describe("default", () => {
    const c = create(opts);
    test("is undefined before init", () => {
      expect(c.referenceResolver).toBeUndefined();
    });

    describe("initReferenceResolver", () => {
      const composer = create(opts);
      describe("initialized", () => {
        composer.initResultHandler();

        test("is function", () => {
          expect(typeof composer.referenceResolver).toEqual("function");
        });
      });
    });
  });
  describe("passed in config", () => {
    const createReferenceResolver = () => ({
      resolved: "y"
    });
    const config = {
      createReferenceResolver
    };
    const composer = create(opts, config);

    describe("initKeyMaker", () => {
      composer.initReferenceResolver();
      test("is object", () => {
        expect(typeof composer.referenceResolver).toEqual("object");
      });

      test("generates ?? as expected", () => {
        expect(composer.referenceResolver.resolved).toEqual("y");
      });
    });
  });
});
