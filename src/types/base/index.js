const merge = require("merge");
const { InfoHandler } = require("../info");
const { $default } = require("../default");
const { createKeyMaker, createResultHandler } = require("./result");
const { createDispatcher } = require("./dispatcher");
const { createReferenceResolver } = require("./reference");
const { createTypeHandler } = require("./type-handler");
const { createEntryObj } = require("./entry");
const { isObjectType, isStringType } = require("../util");
const { Composer } = require("./composer");

class MappingBaseType extends InfoHandler {
  constructor(opts = {}, config) {
    super(config || opts.config);

    const { parentName, schema, key, value = {} } = opts;
    config = config || opts.config || {};
    this.opts = opts;
    this.parentName = parentName;
    this.schema = schema || config.schema;
    this.key = key;
    this.format = value.format;
    this.result = config.result || {};
    this.visitedPaths = config.visitedPaths || {};
    this.config = merge.recursive($default.config, config);
    config = this.config;
    this.value = value;
    // TODO: make configurable by passing via config
    this.nested = config.nested;
    this.nestingLv = config.nestingLv;
  }

  validateSchema(schema) {
    schema = schema || this.schema;
    if (!isObjectType(schema)) {
      this.error("validateInit", "Missing or invalid schema", {
        config: this.config,
        schema
      });
    }
  }

  init() {
    this.validateSchema();
    // use Composer to compose
    this.composer = new Composer({ target: this, ...this.opts });
    this.composer.init();
    this.resolveValue();
    return this;
  }

  resolveValue() {
    const { value } = this;
    this.value = this.resolve(value);
  }

  get type() {
    const calculatedType = this.typeHandler.type;
    console.log({ calculatedType });
    return calculatedType || this.baseType;
  }

  get typeMap() {
    return this.typeHandler.typeMap || {};
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

  message() {
    return config.messages[this.key] || config.messages[this.type] || {};
  }
}

module.exports = {
  MappingBaseType
};
