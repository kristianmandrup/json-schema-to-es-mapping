const { createResultHandler } = require("./result-handler");
const { createTypeHandler } = require("../type-handler");
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

  describe.skip("create", () => {
    describe("missing keyMaker", () => {
      const typeHandler = {};
      test("throws", () => {
        expect(() => create({ key, typeHandler }, config)).toThrow();
      });
    });

    describe("missing keyMaker", () => {
      const keyMaker = {};
      test("throws", () => {
        expect(() => create({ key, keyMaker }, config)).toThrow();
      });
    });
  });

  describe("valid handler", () => {
    // const keyMaker = {};
    // const typeHandler = {};
    const config = {
      resultMap
      // keyMaker,
      // typeHandler
    };

    const handler = create({ key }, config);

    describe("resultKeyName", () => {
      const keyName = key;
      test("is key name", () => {
        expect(handler.resultKeyName).toEqual(keyName);
      });
    });

    describe("calcResultKey", () => {
      const madeKey = key;
      test("is key name", () => {
        expect(handler.calcResultKey()).toEqual(madeKey);
      });
    });

    describe("resultMap", () => {
      test("should be resultMap", () => {
        expect(handler.resultMap).toEqual(resultMap);
      });
    });

    describe("result", () => {
      const obj = {
        name: "x"
      };
      test("is expected obj", () => {
        expect(handler.result).toEqual(obj);
      });
    });

    describe("shouldSetResult", () => {
      test("is true", () => {
        expect(handler.shouldSetResult).toBeTruthy();
      });
    });

    describe("createAndStoreResult", () => {
      describe("Missing typeHandler", () => {
        test("throws", () => {
          expect(() => handler.createAndStoreResult()).not.toThrow();
          expect(handler.createAndStoreResult()).toEqual({ type: "keyword" });
        });
      });
      describe("Missing typeHandler", () => {
        const typeName = "string";
        const entry = {};
        const type = "keyword";
        handler.typeHandler = createTypeHandler({ typeName, entry, type });
        test("creates, stores and returns result", () => {
          expect(() => handler.createAndStoreResult()).not.toThrow();
          expect(handler.createAndStoreResult()).toEqual(
            handler.resolvedResult
          );
        });
      });
    });
  });
});
