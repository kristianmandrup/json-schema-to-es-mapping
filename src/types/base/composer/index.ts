import { isObjectType, isStringType } from "../../util";
import { createKeyMaker, createResultHandler } from "../result";
import { createDispatcher } from "../dispatcher";
import { createReferenceResolver } from "../reference";
import { createTypeHandler } from "../type-handler";
import { createEntryObj } from "../entry";
import { InfoHandler } from "../../info";

export const createComposer = (opts, config) => new Composer(opts, config);

export class Composer extends InfoHandler {
  referenceResolver: any;
  opts: any;
  key: string;
  value: any;
  type: string;
  schema: any;
  parentName: string;
  nestedKey: string;
  target: any;
  entry: any; // IEntry
  dispatcher: any; // IDispatcher
  keyMaker: any; // IKeyMaker
  entryObj: any; // IEntryObj
  typeHandler: any; // ITypeHandler
  resultHandler: any; // IResultHandler
  typeName: string;

  constructor(opts: any = {}, config: any = {}) {
    super(config);
    const { key, parentName, value, type, entry, schema, target } = opts;
    this.opts = opts;
    this.key = key;
    this.value = value;
    this.type = type;
    this.config = opts.config || config;
    this.schema = schema || this.config.schema || config.schema;
    this.parentName = parentName;
    this.target = target;
    this.entry = entry;
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

  validateSchema(schema?: any) {
    schema = schema || this.schema;
    if (!isObjectType(schema)) {
      this.error("validateInit", "Missing or invalid schema", {
        ...this.ctx,
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

  initKeyMaker(opts: any = {}) {
    const { target } = this;
    let { key, parentName, config } = opts;

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

  initEntryObj(opts: any = {}) {
    const { target } = this;
    let { key, nestedKey, config } = opts;
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

  initDispatcher(config?: any) {
    const { target } = this;

    config = config || this.config;
    const $createDispatcher = config.createDispatcher || createDispatcher;
    const dispatcher = $createDispatcher(config);
    this.validateCreated("initDispatcher", "dispatcher", dispatcher);
    target.dispatcher = dispatcher;
    this.dispatcher = dispatcher;
    return this;
  }

  initTypeHandler(opts: any = {}) {
    const { target } = this;
    let { type, typeName, calcType, config } = opts;

    type = type || this.type;
    typeName = typeName || this.typeName;
    config = config || this.config;
    calcType = calcType || (() => type);
    const $createTypeHandler = config.createTypeHandler || createTypeHandler;
    const entry = this.entry || this.defaultEntry;
    const $opts = { typeName, entry, type, calcType };
    const typeHandler = $createTypeHandler($opts, config);
    this.validateCreated("initTypeHandler", "typeHandler", typeHandler);
    this.typeHandler = typeHandler;
    target.typeHandler = typeHandler;
    return this;
  }

  get defaultEntry() {
    this.initEntryObj();
    return this.entry;
  }

  initResultHandler(opts: any = {}) {
    const { target } = this;
    let { entry, keyMaker, typeHandler, config } = opts;

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

  initReferenceResolver({ opts, config }: any = {}) {
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
