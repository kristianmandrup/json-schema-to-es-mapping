const { createResultDispatcher } = require("./result-dispatcher");
const create = createResultDispatcher;

const create = (done, expectation) => {
  const config = {
    onResult: result => {
      expectation(result);
      done();
    }
  };

  return createResultDispatcher($opts, config);
};

const result = {
  done: true
};
describe("ResultDispatcher", () => {
  const dispatcher = create();
  describe("dispatch", () => {
    test("payload dispatched", done => {
      const expectation = res => expect(res).toEqual(expected);
      const dispatcher = create(done, expectation);
      dispatcher.dispatch(result);
    });
  });
});
