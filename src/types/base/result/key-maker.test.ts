const { createKeyMaker } = require("./key-maker");
const create = createKeyMaker;

describe("ResultHandler", () => {
  describe("no parent name", () => {
    const maker = create({ key: "x" });
    describe("calcNestedKey", () => {
      test("default calc of nested key", () => {
        expect(maker.calcNestedKey()).toEqual("x");
      });
    });

    describe("nestedKey", () => {
      test("default calc of nested key", () => {
        expect(maker.nestedKey).toEqual("x");
      });
    });
  });

  describe("with parent name", () => {
    const maker = create({ key: "x", parentName: "par" });
    describe("calcNestedKey", () => {
      test("default calc of nested key", () => {
        expect(maker.calcNestedKey()).toEqual("par_x");
      });
    });

    describe("nestedKey", () => {
      test("default calc of nested key", () => {
        expect(maker.nestedKey).toEqual("par_x");
      });
    });

    describe("custom name separator", () => {
      const maker = create(
        { key: "x", parentName: "par" },
        { nameSeparator: "-" }
      );
      describe("nestedKey", () => {
        test("default calc of nested key", () => {
          expect(maker.nestedKey).toEqual("par-x");
        });
      });
    });
  });
});
