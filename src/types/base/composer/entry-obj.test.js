const { create, opts } = require("./helpers");
describe("create entryObj", () => {
  describe("default", () => {
    const mapper = create(opts);
    test("is undefined before init", () => {
      expect(mapper.entryObj).toBeUndefined();
    });

    describe("initEntryObj", () => {
      mapper.initEntryObj();

      test("is function", () => {
        expect(typeof mapper.entryObj).toEqual("function");
      });
    });
  });
  describe("passed in config", () => {});
});
describe("create dispatcher", () => {
  describe("default", () => {
    const mapper = create(opts);
    test("is undefined before init", () => {
      expect(mapper.dispatcher).toBeUndefined();
    });

    describe("initDispatcher", () => {
      mapper.initDispatcher();

      test("is function", () => {
        expect(typeof mapper.dispatcher).toEqual("function");
      });
    });
  });
  describe("passed in config", () => {});
});
