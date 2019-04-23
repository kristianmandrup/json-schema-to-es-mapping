const { InfoHandler } = require("../info");
const { $default } = require("../default");
const {
  createKeyMaker,
  createDispatcher,
  createResultHandler
} = require("./result");
const { createReferenceResolver } = require("./reference");
const { createTypeHandler } = require("./type-handler");

class MappingBaseType extends InfoHandler {
  constructor(opts = {}) {
    super(opts.config);
    const { parentName, key, value = {}, result, config = {} } = opts;
    this.parentName = parentName;
    this.schema = config.schema;
    this.key = key;

    this.value = this.resolveValueObject(value);

    this.format = value.format;
    this.result = result || config.resultObj || {};
    this.visitedPaths = visitedPaths || config.visitedPaths || {};
    this.config = {
      ...$default.config,
      ...config
    };

    // TODO: make configurable by passing via config
    this.keyMaker = createKeyMaker({ key, parentName }, config);
    this.dispatcher = createDispatcher(config);
    this.resultHandler = createResultHandler(config);
    this.referenceResolver = createReferenceResolver(config);
    this.typeHandler = createTypeHandler({ typeName: this.typeName }, config);

    this.nested = config.nested;
    this.nestingLv = config.nestingLv;
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
