import { create, opts } from "./helpers";
describe("create keyMaker", () => {
  describe("default", () => {
    const c = create(opts);
    test("is undefined before init", () => {
      expect(c.keyMaker).toBeUndefined();
    });
  });

  describe("initKeyMaker", () => {
    const composer = create(opts);
    composer.initKeyMaker();
    test("is object", () => {
      expect(typeof composer.keyMaker).toEqual("object");
    });

    test("generates key as expected", () => {
      expect(composer.keyMaker.key).toEqual("x");
    });
  });

  describe("passed in config", () => {
    const createKeyMaker = () => ({
      key: "y"
    });
    const config = {
      createKeyMaker
    };
    const composer = create(opts, config);

    describe("initKeyMaker", () => {
      composer.initKeyMaker();
      test("is object", () => {
        expect(typeof composer.keyMaker).toEqual("object");
      });

      test("generates key as expected", () => {
        expect(composer.keyMaker.key).toEqual("y");
      });
    });
  });
});
