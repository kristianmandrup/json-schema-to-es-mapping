const { create, opts } = require("./helpers");

describe("create resultHandler", () => {
  describe("default", () => {
    const mapper = create(opts);
    test("is undefined before init", () => {
      expect(mapper.resultHandler).toBeUndefined();
    });

    describe("initResultHandler", () => {
      describe("no keyMaker", () => {
        mapper.initEntryObj();
        mapper.initTypeHandler();

        test("throws", () => {
          expect(mapper.initResultHandler()).toThrow();
        });
      });

      describe("no typeHandler", () => {
        mapper.initKeyMaker();
        mapper.initEntryObj();

        test("throws", () => {
          expect(mapper.initResultHandler()).toThrow();
        });
      });

      describe("no entry", () => {
        mapper.initKeyMaker();
        mapper.initTypeHandler();

        test("throws", () => {
          expect(mapper.initResultHandler()).toThrow();
        });
      });

      describe("initialized", () => {
        mapper.initKeyMaker();
        mapper.initTypeHandler();
        mapper.initEntryObj();
        mapper.initResultHandler();

        test("is function", () => {
          expect(typeof mapper.resultHandler).toEqual("function");
        });
      });
    });
  });
  describe("passed in config", () => {});
});
