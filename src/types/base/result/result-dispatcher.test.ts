const { createResultDispatcher } = require("./result-dispatcher");

const create = (done, expectation) => {
  const config = {
    logging: true,
    onResult: result => {
      expectation(result);
      done();
    }
  };

  return createResultDispatcher(config);
};

const result = {
  done: true
};
describe("ResultDispatcher", () => {
  describe("dispatch", () => {
    test("payload dispatched", done => {
      const expectation = res => expect(res).toEqual(result);
      const dispatcher = create(done, expectation);
      dispatcher.dispatch(result);
    });
  });
});
