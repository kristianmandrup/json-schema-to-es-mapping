const createResultHandler = (opts, config) => new ResultHandler(opts, config);
const { createKeyMaker } = require("./key-maker");

class ResultHandler {
  constructor(opts = {}, config = {}) {
    this.shouldSetResult = config.shouldSetResult || this.shouldSetResult;
    this.keyMaker =
      opts.keyMaker || config.keyMaker || createKeyMaker(opts, config);
    this.resultKey = config.resultKey || this.calcResultKey.bind(this);
    this.entry = opts.entry;
    this.dispatcher = opts.dispatcher || config.dispatcher;
    this.resultMap = config.resultMap || {};
  }

  calcResultKey() {
    return this.keyMaker.resultKey;
  }

  shouldSetResult() {
    return true;
  }

  get resultObj() {
    const key = this.resultKey(this);
    return this.resultMap[key];
  }

  get resultKeyName() {
    return this.resultKey();
  }

  createResult() {
    if (this._result) return this._result;
    this._result = {
      type: this.type,
      ...this.entry
    };
    return this._result;
  }

  get resolvedResult() {
    return this.createResult();
  }

  setResultObj(result) {
    this.resultMap[this.resultKeyName] = result;
  }

  setResult(result) {
    this.setResultObj(result);
    this.dispatch();
  }

  dispatch() {
    if (!this.dispatcher) return;
    this.dispatcher.dispatch(this.resolvedResult);
  }

  createMappingResult() {
    return this.resolvedResult;
  }

  createAndStoreResult() {
    if (this.shouldSetResult(this.resolvedResult)) {
      const result = this.resolvedResult;
      this.setResult(result);
    }
  }
}

module.exports = {
  createResultHandler,
  ResultHandler
};
