const { isObjectType, isStringType } = require("../util");
const { createKeyMaker, createResultHandler } = require("./result");
const { createDispatcher } = require("./dispatcher");
const { createReferenceResolver } = require("./reference");
const { createTypeHandler } = require("./type-handler");
const { createEntryObj } = require("./entry");
const { InfoHandler } = require("../info");

const createComposer = (opts, config) => new Composer(opts, config);

class Composer extends InfoHandler {
  constructor(opts = {}, config = {}) {
    super(config);
    const { key, parentName, value, target } = opts;
    this.opts = opts;
    this.key = key;
    this.value = value;
    this.parentName = parentName;
    this.config = opts.config || config;
    this.target = target;
  }

  validateInit() {
    const { opts, key, value } = this;
    if (!isObjectType(value)) {
      this.error("validateInit", "Missing or invalid value", { opts });
    }
    if (!isStringType(key)) {
      this.error("validateInit", "Missing or invalid key", { opts });
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

    const keyMaker = createKeyMaker({ key, parentName }, config);
    target.keyMaker = keyMaker;
    target.nestedKey = keyMaker.nestedKey;
    return this;
  }

  initEntryObj({ key, nestedKey, config } = {}) {
    const { target } = this;

    key = key || this.key;
    nestedKey = nestedKey || this.nestedKey;
    config = config || this.config;

    const entryObj = createEntryObj({ key, nestedKey }, config);
    target.entryObj = entryObj;
    target.entry = entryObj.entry;
    return this;
  }

  initDispatcher(config) {
    const { target } = this;

    config = config || this.config;

    target.dispatcher = createDispatcher(config);
    return this;
  }

  initTypeHandler({ type, typeName, calcType, config } = {}) {
    const { target } = this;

    type = type || this.type;
    typeName = typeName || this.typeName;
    config = config || this.config;
    calcType = calcType || (() => type);

    target.typeHandler = createTypeHandler({ typeName, calcType }, config);
    return this;
  }

  initResultHandler({ entry, keyMaker, typeHandler, config } = {}) {
    const { target } = this;

    entry = entry || this.entry;
    keyMaker = keyMaker || this.keyMaker;
    typeHandler = typeHandler || this.typeHandler;
    config = config || this.config;

    target.resultHandler = createResultHandler(
      { entry, keyMaker, typeHandler },
      config
    );
    return this;
  }

  initReferenceResolver({ opts, config } = {}) {
    const { target } = this;

    opts = opts || this.opts;
    config = config || this.config;

    target.referenceResolver = createReferenceResolver(opts, config);
    return this;
  }
}

module.exports = {
  Composer,
  createComposer
};
