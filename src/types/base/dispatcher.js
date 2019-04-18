const { createResultDispatcher } = require("./dispatcher");

const createDispatcher = config => new Dispatcher(config);

class Dispatcher {
  constructor(config = {}) {
    const $createResultDispatcher =
      config.createResultDispatcher || createResultDispatcher(config);
    this.dispatcher = $createResultDispatcher(config);
  }

  dispatch(result) {
    this.dispatcher.dispatch(this.dispatchObjFor(result));
  }

  get lookupObj() {}

  dispatchObjFor(result) {
    return {
      ...this.lookupObj,
      ...result
    };
  }
}

module.exports = {
  createResultDispatcher,
  ResultDispatcher
};
