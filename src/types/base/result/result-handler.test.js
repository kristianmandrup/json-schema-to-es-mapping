const { createResultHandler } = require("./result-handler");
const create = createResultHandler;

describe("ResultHandler", () => {
  const key = "x";
  const resultMap = {
    x: {
      name: "x"
    }
  };
  const config = {
    resultMap
  };
  const handler = create({ key }, config);

  describe("calcResultKey", () => {
    const madeKey = key;
    test("should set", () => {
      expect(handler.calcResultKey()).toEqual(madeKey);
    });
  });

  describe("resultMap", () => {
    const obj = {
      name: "x"
    };
    test("should be resultMap", () => {
      expect(handler.resultMap).toEqual(resultMap);
    });
  });

  describe("resultObj", () => {
    const obj = {
      name: "x"
    };
    test("should set", () => {
      expect(handler.resultObj).toEqual(obj);
    });
  });

  describe("shouldSetResult", () => {
    test("should set", () => {
      expect(handler.shouldSetResult).toBeTruthy();
    });
  });

  describe("createAndStoreResult", () => {
    test("should store", () => {
      handler.createAndStoreResult();
    });
  });
});
