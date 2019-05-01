const merge = require("merge");
const { InfoHandler } = require("../info");
const { $default } = require("../default");
const { isObjectType } = require("../util");
const { createComposer } = require("./composer");

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
    this.composer = this.createComposer({
      target: this,
      type: this.type,
      ...this.opts
    });
    this.composer.init();
    this.resolveValue();
    return this;
  }

  createComposer(opts = {}) {
    const $createComposer = this.config.createComposer || createComposer;
    return $createComposer(opts, this.config);
  }

  resolveValue() {
    const { value } = this;
    this.value = this.resolve(value);
  }

  get calculatedType() {
    return this.typeHandler.type;
  }

  get type() {
    return this.calculatedType || this.baseType;
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

  get resolvedResult() {
    return this.resultHandler.result;
  }

  resolve(obj) {
    if (!isObjectType(obj)) {
      this.error("resolve", "Missing or invalid object", {
        obj
      });
    }
    const resolved = this.referenceResolver.resolve(obj);
    this.wasCacheHit = this.referenceResolver.wasCacheHit;
    // this.resolved = resolved
    return resolved;
  }
}

module.exports = {
  MappingBaseType
};
