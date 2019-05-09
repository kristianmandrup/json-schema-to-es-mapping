import { createDispatcher } from "./dispatcher";

const $opts = {
  key: "name",
  value: {
    type: "string"
  },
  parentName: "person",
  resultKeyName: "name"
};

const create = (done, expectation) => {
  const config = {
    onResult: result => {
      expectation(result);
      done();
    }
  };

  return createDispatcher($opts, config);
};

const createSimple = () => {
  const config = {
    onResult: () => ({})
  };

  return createDispatcher($opts, config);
};

const result = {
  done: true
};
const lookupObj = {
  key: "name",
  parentName: "person",
  resultKey: "name",
  schemaValue: { type: "string" }
};

const expected = {
  done: true,
  ...lookupObj
};

describe("dispatcher", () => {
  const dispatcher = createSimple();
  describe("lookupObj", () => {
    test("object", () => {
      expect(dispatcher.lookupObj).toEqual(lookupObj);
    });
  });

  describe("dispatchObjFor", () => {
    test("object", () => {
      expect(dispatcher.dispatchObjFor(result)).toEqual(expected);
    });
  });

  describe("dispatch", () => {
    test("dispatches", done => {
      const expectation = res => expect(res).toEqual(expected);

      const dispatcher = create(done, expectation);
      dispatcher.dispatch(result);
    });
  });
});
