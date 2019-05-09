import { create, opts } from "./helpers";
describe("create entryObj", () => {
  describe("default", () => {
    describe("no init", () => {
      const composer = create(opts);
      test("is undefined before init", () => {
        expect(composer.entryObj).toBeUndefined();
      });
    });

    describe("init", () => {
      describe("initEntryObj", () => {
        const composer = create(opts);
        composer.initEntryObj();

        test("is function", () => {
          expect(typeof composer.entryObj).toEqual("object");
        });
      });
    });
    describe("passed in config", () => {});
  });
});
