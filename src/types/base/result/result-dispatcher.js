const { InfoHandler } = require("../../info");
const { isFunction } = require("../../util");

const createResultDispatcher = config => new ResultDispatcher(config);

class ResultDispatcher extends InfoHandler {
  constructor(config = {}) {
    super(config);
    this.onResult = config.onResult;
  }

  dispatch(payload) {
    if (!isFunction(this.onResult)) {
      this.info("dispatch", "missing onResult callback", {
        onResult: this.onResult
      });
      return;
    }
    this.onResult(payload);
  }
}

module.exports = {
  createResultDispatcher,
  ResultDispatcher
};
