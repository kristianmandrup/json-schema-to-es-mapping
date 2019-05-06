const createResultHandler = (opts, config) => new ResultHandler(opts, config);
const { createKeyMaker } = require("./key-maker");
const { createTypeHandler } = require("../type-handler");
const { InfoHandler } = require("../../info");

class ResultHandler extends InfoHandler {
  constructor(opts = {}, config = {}) {
    super(config);
    this.opts = opts;
    this.shouldSetResult = config.shouldSetResult || this.shouldSetResult;
    // TODO: refactor to setter

    // this.keyMaker = this.getKeyMaker();
    // this.typeHandler = this.getTypeHandler();
    this.keyMaker = this.getOrCreateKeyMaker();
    this.typeHandler = this.getOrCreateTypeHandler();

    this.resultKey = config.resultKey || this.calcResultKey.bind(this);
    this.entry = opts.entry;
    this.dispatcher = opts.dispatcher || config.dispatcher;
    this.resultMap = config.resultMap || {};
    this._type = opts.type;
  }

  set keyMaker(keyMaker) {
    if (!keyMaker) {
      this.error("set keyMaker", "invalid or missing keyMaker", this.ctx);
    }
    this._keyMaker = keyMaker;
  }

  get keyMaker() {
    return this._keyMaker;
  }

  get typeHandler() {
    return this._typeHandler;
  }

  set typeHandler(typeHandler) {
    if (!typeHandler) {
      this.error("set typeHandler", "invalid or missing typeHandler", this.ctx);
    }
    this._typeHandler = typeHandler;
  }

  getKeyMaker() {
    const { opts, config } = this;
    return opts.keyMaker || config.keyMaker;
  }

  createKeyMaker() {
    const { opts, config } = this;
    return createKeyMaker(opts, config);
  }

  getOrCreateTypeHandler() {
    return this.getTypeHandler() || this.createTypeHandler();
  }

  getOrCreateKeyMaker() {
    return this.getKeyMaker() || this.createKeyMaker();
  }

  getTypeHandler() {
    const { opts, config } = this;
    return opts.typeHandler || config.typeHandler;
  }

  createTypeHandler() {
    const { opts, config } = this;
    return createTypeHandler(opts, config);
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
