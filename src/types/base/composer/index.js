const { isObjectType, isStringType } = require("../../util");
const { createKeyMaker, createResultHandler } = require("../result");
const { createDispatcher } = require("../dispatcher");
const { createReferenceResolver } = require("../reference");
const { createTypeHandler } = require("../type-handler");
const { createEntryObj } = require("../entry");
const { InfoHandler } = require("../../info");

const createComposer = (opts, config) => new Composer(opts, config);

class Composer extends InfoHandler {
  constructor(opts = {}, config = {}) {
    super(config);
    const { key, parentName, value, schema, target } = opts;
    this.opts = opts;
    this.key = key;
    this.value = value;
    this.schema = schema;
    this.parentName = parentName;
    this.config = opts.config || config;
    this.target = target;
  }

  get ctx() {
    return {
      opts: this.opts,
      config: this.config
    };
  }

  validateInit() {
    const { opts, key, value } = this;
    if (!isObjectType(value)) {
      this.error("validateInit", "Missing or invalid value", { opts, value });
    }
    if (!isStringType(key)) {
      this.error("validateInit", "Missing or invalid key", { opts, key });
    }
    this.validateSchema();
    return this;
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
    this.validateInit();
    this.initKeyMaker();
    this.initEntryObj();
    this.initDispatcher();
    this.initTypeHandler();
    this.initResultHandler();
    this.initReferenceResolver();
    return this;
  }

  initKeyMaker({ key, parentName, config } = {}) {
    const { target } = this;

    key = key || this.key;
    parentName = parentName || this.parentName;
    config = config || this.config;
    const $createKeyMaker = config.createKeyMaker || createKeyMaker;
    const keyMaker = $createKeyMaker({ key, parentName }, config);
    this.validateCreated("initKeyMaker", "keyMaker", keyMaker);
    this.keyMaker = keyMaker;
    target.keyMaker = keyMaker;
    target.nestedKey = keyMaker.nestedKey;
    return this;
  }

  initEntryObj({ key, nestedKey, config } = {}) {
    const { target } = this;

    key = key || this.key;
    nestedKey = nestedKey || this.nestedKey;
    config = config || this.config;
    const $createEntryObj = config.createEntryObj || createEntryObj;
    const entryObj = $createEntryObj({ key, nestedKey }, config);
    this.validateCreated("initEntryObj", "entryObj", entryObj);

    target.entryObj = entryObj;
    const entry = entryObj.entry;
    this.entryObj = entryObj;
    this.entry = entry;
    target.entry = entryObj.entry;
    return this;
  }

  validateCreated(method, label, created) {
    if (!isObjectType(created)) {
      this.error(method, `Missing or invalid ${label}`, this.ctx);
    }
  }

  initDispatcher(config) {
    const { target } = this;

    config = config || this.config;
    const $createDispatcher = config.createDispatcher || createDispatcher;
    const dispatcher = $createDispatcher(config);
    this.validateCreated("initDispatcher", "dispatcher", dispatcher);
    target.dispatcher = dispatcher;
    this.dispatcher = dispatcher;
    return this;
  }

  initTypeHandler({ type, typeName, calcType, config } = {}) {
    const { target } = this;

    type = type || this.type;
    typeName = typeName || this.typeName;
    config = config || this.config;
    calcType = calcType || (() => type);
    const $createTypeHandler = config.createTypeHandler || createTypeHandler;
    const typeHandler = $createTypeHandler({ typeName, calcType }, config);
    this.validateCreated("initTypeHandler", "typeHandler", typeHandler);
    this.typeHandler = typeHandler;
    target.typeHandler = typeHandler;
    return this;
  }

  initResultHandler({ entry, keyMaker, typeHandler, config } = {}) {
    const { target } = this;

    entry = entry || this.entry;
    keyMaker = keyMaker || this.keyMaker;
    typeHandler = typeHandler || this.typeHandler;
    config = config || this.config;
    const $createResultHandler =
      config.createResultHandler || createResultHandler;

    const resultHandler = $createResultHandler(
      { entry, keyMaker, typeHandler },
      config
    );
    this.validateCreated("initResultHandler", "resultHandler", resultHandler);

    target.resultHandler = resultHandler;
    this.resultHandler = resultHandler;
    return this;
  }

  initReferenceResolver({ opts, config } = {}) {
    const { target } = this;

    opts = opts || this.opts;
    config = config || this.config;
    const $createReferenceResolver =
      config.createReferenceResolver || createReferenceResolver;

    const referenceResolver = $createReferenceResolver(opts, config);
    this.validateCreated(
      "initReferenceResolver",
      "referenceResolver",
      referenceResolver
    );

    target.referenceResolver = referenceResolver;
    this.referenceResolver = referenceResolver;
    return this;
  }
}

module.exports = {
  Composer,
  createComposer
};
