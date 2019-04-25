const { InfoHandler } = require("../info");
const { $default } = require("../default");
const { createKeyMaker, createResultHandler } = require("./result");
const { createDispatcher } = require("./dispatcher");
const { createReferenceResolver } = require("./reference");
const { createTypeHandler } = require("./type-handler");
const { createEntryObj } = require("./entry");

class MappingBaseType extends InfoHandler {
  constructor(opts = {}) {
    super(opts.config);
    const { parentName, key, value = {} } = opts;
    let { config } = opts;
    this.opts = opts;
    this.parentName = parentName;
    this.schema = config.schema;
    this.key = key;
    this.format = value.format;
    this.result = config.resultObj || {};
    this.visitedPaths = config.visitedPaths || {};
    this.config = {
      ...$default.config,
      ...config
    };
    config = this.config;
    this.value = value;
    // TODO: make configurable by passing via config
    this.nested = config.nested;
    this.nestingLv = config.nestingLv;
  }

  init() {
    const { key, parentName, config, opts, value } = this;
    this.keyMaker = createKeyMaker({ key, parentName }, config);
    const nestedKey = this.keyMaker.nestedKey;

    this.entryObj = createEntryObj({ key, nestedKey }, config);
    const entry = this.entryObj.entry;
    this.dispatcher = createDispatcher(config);

    const calcType = () => this.type;
    const typeName = this.typeName;
    this.typeHandler = createTypeHandler({ typeName, calcType }, config);

    this.resultHandler = createResultHandler(
      { entry, keyMaker: this.keyMaker, typeHandler: this.typeHandler },
      config
    );
    this.referenceResolver = createReferenceResolver(opts, config);

    this.value = this.resolve(value);
    return this;
  }

  get typeName() {
    this.error("typeName must be specified by subclass");
  }

  dispatch() {
    this.dispatcher.dispatch(this.dispatchObj);
  }

  convert() {
    this.createAndStoreResult();
    return this.createMappingResult();
  }

  createMappingResult() {
    return this.resultHandler.createMappingResult();
  }

  createAndStoreResult() {
    this.resultHandler.createAndStoreResult();
  }

  resolve(obj) {
    const resolved = this.referenceResolver.resolve(obj);
    this.wasCacheHit = this.referenceResolver.wasCacheHit;
    return resolved;
  }

  get type() {
    return this.typeHandler.type || this.baseType;
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {};
  }
}

module.exports = {
  $default,
  MappingBaseType
};
