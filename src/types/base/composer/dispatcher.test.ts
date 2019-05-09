import { create, opts } from "./helpers";

describe("create dispatcher", () => {
  describe("default", () => {
    describe("no init", () => {
      const mapper = create(opts);
      test("is undefined before init", () => {
        expect(mapper.dispatcher).toBeUndefined();
      });
    });
    describe("init", () => {
      describe("initDispatcher", () => {
        const mapper = create(opts);
        mapper.initDispatcher();

        test("is object", () => {
          expect(typeof mapper.dispatcher).toEqual("object");
        });
      });
    });
    describe("passed in config", () => {});
  });
});
