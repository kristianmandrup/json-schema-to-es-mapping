import { create, opts } from "./helpers";

describe("create resultHandler", () => {
  describe("default", () => {
    describe("no init", () => {
      const composer = create(opts);
      test("is undefined before init", () => {
        expect(composer.resultHandler).toBeUndefined();
      });
    });

    describe("init", () => {
      const composer = create(opts);
      describe("initResultHandler", () => {
        describe("no keyMaker", () => {
          composer.initEntryObj();
          composer.initTypeHandler();

          test("throws", () => {
            expect(() => composer.initResultHandler()).toThrow();
          });
        });

        describe("no typeHandler", () => {
          composer.initKeyMaker();
          composer.initEntryObj();

          test("throws", () => {
            expect(() => composer.initResultHandler()).toThrow();
          });
        });

        describe("no entry", () => {
          composer.initKeyMaker();
          composer.initTypeHandler();

          test("throws", () => {
            expect(composer.initResultHandler()).toThrow();
          });
        });

        describe("initialized", () => {
          composer.initKeyMaker();
          composer.initTypeHandler();
          composer.initEntryObj();
          composer.initResultHandler();

          test("is function", () => {
            expect(typeof composer.resultHandler).toEqual("function");
          });
        });
      });
    });
    describe("passed in config", () => {});
  });
});
