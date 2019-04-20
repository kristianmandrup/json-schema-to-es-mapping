const { createResultDispatcher } = require("./result");
const { createLookupObject } = require("./lookup");
const createDispatcher = (opts, config) => new Dispatcher(opts, config);

class Dispatcher {
  constructor(opts = {}, config = {}) {
    const $createResultDispatcher =
      config.createResultDispatcher || createResultDispatcher;
    this.dispatcher = $createResultDispatcher(config);
    this.lookup = createLookupObject(opts, config);
  }

  dispatch(result) {
    this.dispatcher.dispatch(this.dispatchObjFor(result));
  }

  get lookupObj() {
    return this.lookup.object;
  }

  dispatchObjFor(result) {
    return {
      ...this.lookupObj,
      ...result
    };
  }
}

module.exports = {
  createDispatcher,
  Dispatcher
};
