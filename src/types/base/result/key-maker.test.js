const { createKeyMaker } = require("./key-maker");
const create = createKeyMaker;

describe("ResultHandler", () => {
  const maker = create();
  describe("nestedKey", () => {
    test("default calc of nested key", () => {
      expect(maker.nestedKey()).toEqual("x");
    });
  });
});
