const createResultHandler = (opts, config) => new ResultHandler(opts, config);
const { createKeyMaker } = require("./key-maker");
const { InfoHandler } = require("../../info");

class ResultHandler extends InfoHandler {
  constructor(opts = {}, config = {}) {
    super(config);
    this.opts = opts;
    this.shouldSetResult = config.shouldSetResult || this.shouldSetResult;
    // TODO: refactor to setter
    this.keyMaker =
      opts.keyMaker || config.keyMaker || createKeyMaker(opts, config);

    this.typeHandler = opts.typeHandler || config.typeHandler;
    this.resultKey = config.resultKey || this.calcResultKey.bind(this);
    this.entry = opts.entry;
    this.dispatcher = opts.dispatcher || config.dispatcher;
    this.resultMap = config.resultMap || {};
    this._type = opts.type;
  }

  get type() {
    return this._type || this.calcType();
  }

  get _ctx() {
    return {
      opts: this.opts,
      config: this.config
    };
  }

  calcType() {
    if (!this.typeHandler) {
      this.error("calcType", "Missing typeHandler", this._ctx);
    }
    return this.typeHandler.calcType();
  }

  calcResultKey() {
    return this.keyMaker.resultKey;
  }

  shouldSetResult() {
    return true;
  }

  get result() {
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

  setResultMap(result) {
    this.resultMap[this.resultKeyName] = result;
  }

  setResult(result) {
    this.setResultMap(result);
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
      return result;
    }
  }
}

module.exports = {
  createResultHandler,
  ResultHandler
};
