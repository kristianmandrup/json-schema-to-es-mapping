const { isFunction } = require("../../util");

const createResultDispatcher = config => new ResultDispatcher(config);

class ResultDispatcher {
  constructor(config = {}) {
    this.onResult = config.onResult;
  }

  dispatch(payload) {
    if (!isFunction(this.onResult)) return;
    this.onResult(payload);
  }
}

module.exports = {
  createResultDispatcher,
  ResultDispatcher
};
