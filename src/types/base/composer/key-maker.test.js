const { create, opts } = require("./helpers");
describe("create keyMaker", () => {
  describe("default", () => {
    const composer = create(opts);
    test("is undefined before init", () => {
      expect(composer.keyMaker).toBeUndefined();
    });

    describe("initKeyMaker", () => {
      composer.initKeyMaker();
      test("is function", () => {
        expect(typeof composer.keyMaker).toEqual("object");
      });

      test("generates key as expected", () => {
        expect(composer.keyMaker.key).toEqual("x");
      });
    });
  });
  describe("passed in config", () => {});
});
