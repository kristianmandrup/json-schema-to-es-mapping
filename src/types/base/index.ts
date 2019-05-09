import merge from "merge";
import { InfoHandler } from "../info";
import { $default } from "../default";
import { isObjectType } from "../util";
import { createComposer } from "./composer";

export class MappingBaseType extends InfoHandler {
  opts: any;
  parentName: string;
  key: string;
  format: string;
  schema: any;
  result: any;
  visitedPaths: string[];
  nested: boolean;
  value: any;
  nestingLv: number;
  composer: any; // IComposer
  wasCacheHit: boolean;

  constructor(opts: any = {}, config: any) {
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

  init() {
    // this.validateSchema();
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

  get typeHandler() {
    return this.composer.typeHandler;
  }

  get calculatedType() {
    return this.typeHandler.calcType();
  }

  get type() {
    return this.calculatedType || this.baseType;
  }

  get baseType() {
    this.error(
      "baseType",
      "default mapping type must be specified by subclass"
    );
    return "unknown";
  }

  get typeMap() {
    return this.typeHandler.typeMap || {};
  }

  get typeName() {
    this.error("typeName", "typeName must be specified by subclass");
    return "unknown";
  }

  get dispatcher() {
    return this.composer.dispatcher;
  }

  get resultHandler() {
    return this.composer.resultHandler;
  }

  get referenceResolver() {
    return this.composer.referenceResolver;
  }

  dispatch() {
    this.dispatcher.dispatch(this.resolvedResult);
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
