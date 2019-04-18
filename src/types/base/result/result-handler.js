const createResultHandler = config => new ResultHandler(config);

class ResultHandler {
  constructor(config = {}) {
    this.shouldSetResult = config.shouldSetResult || this.shouldSetResult;
    this.resultKey = config.resultKey || this.resultKey;
  }

  shouldSetResult() {
    return true;
  }

  get resultObj() {
    const key = this.resultKey(this);
    return this.result[key];
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
    this.result[this.resultKeyName] = result;
  }

  setResult(result) {
    this.setResultObj(result);
    this.dispatch();
  }

  createMappingResult() {
    return this.resolvedResult;
  }

  createAndStoreResult() {
    if (this.shouldSetResult(this)) {
      const result = this.resolvedResult;
      this.setResult(result);
    }
  }
}

module.exports = {
  createResultHandler,
  ResultHandler
};
