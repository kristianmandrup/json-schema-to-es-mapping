const { isFunction } = require("util");
const { InfoHandler } = require("./info");
const { $default } = require("./default");
const { createDefinitionRefResolver } = require("./definition");

class ConvertMappingSchemaError extends Error {}

class MappingBaseType extends InfoHandler {
  constructor(opts = {}) {
    super(opts.config);
    const { parentName, key, value = {}, result, config = {} } = opts;
    this.parentName = parentName;
    this.schema = config.schema;
    this.key = key;

    const defResolverInst = createDefinitionRefResolver(opts);
    this.definitionResolver =
      config.definitionResolver ||
      defResolverInst.resolveRefObject.bind(defResolverInst);

    this.value = this.resolveValueObject(value);

    this.format = value.format;
    this.result = result || config.resultObj || {};
    this.config = {
      ...$default.config,
      ...config
    };

    this.shouldSetResult = config.shouldSetResult || this.shouldSetResult;
    this.nestedKey = config.nestedKey || this.nestedKey;
    this.resultKey = config.resultKey || this.resultKey;
    this.nameSeparator = config.nameSeparator || this.defaultNameSeparator;

    this.nested = config.nested;
    this.nestingLv = config.nestingLv;
    this._meta = this.config._meta_ || {};
    this._types = this._meta.types || {};
  }

  // resolve using defintion ref
  resolveValueObject(obj) {
    if (!obj.$ref) return obj;
    const { definitionResolver } = this;
    if (!isFunction(definitionResolver)) {
      this.error(
        `Invalid definitionResolver, must be a function, was ${typeof definitionResolver}`,
        {
          definitionResolver
        }
      );
    }
    return definitionResolver(obj);
  }

  get defaultNameSeparator() {
    return "_";
  }

  setResultObj(result) {
    this.result[this.key] = result;
  }

  resultKey() {
    return this.nested ? this.nestedKey(this) : this.key;
  }

  nestedKey() {
    return [this.parentName, this.key].join("_");
  }

  get resultObj() {
    const key = this.resultKey(this);
    return this.result[key];
  }

  get resultKeyName() {
    return this.resultKey();
  }

  setResultObj(result) {
    this.result[this.resultKeyName] = result;
  }

  setResult(result) {
    this.setResultObj(result);
    this.onResult(result);
  }

  onResult(result) {
    const onResult = this.config.onResult;
    if (!isFunction(onResult)) return;
    onResult({
      ...this.lookupObj,
      ...result
    });
  }

  get baseType() {
    this.error("default mapping type must be specified by subclass");
  }

  get fields() {
    return this.config.fields || {};
  }

  get lookupObj() {
    const obj = {
      key: this.key,
      resultKey: this.resultKeyName,
      parentName: this.parentName,
      schemaValue: this.value
    };
    if (this.resolvedTypeName) {
      obj.typeName = this.resolvedTypeName;
    }
    return obj;
  }

  get entry() {
    return this.config.entryFor(this.lookupObj) || {};
  }

  configEntryFn() {
    return this.entry;
  }

  get configFieldEntry() {
    return this.fields[this.key] || this.fields[this.nestedKey];
  }

  get configEntry() {
    return this.configFieldEntry || this.configEntryFn || {};
  }

  get configType() {
    return this.configEntry.type || this.metaType();
  }

  metaType(type) {
    type = type || this.baseType;
    return this._types[type];
  }

  shouldSetResult() {
    return true;
  }

  createResult() {
    if (this._result) return this._result;
    this._result = {
      type: this.type,
      ...this.configEntry
    };
    return this._result;
  }

  createMappingResult() {
    return this.createResult();
  }

  createAndStoreResult() {
    if (this.shouldSetResult(this)) {
      const result = this.createResult();
      this.setResult(result);
    }
  }

  convert() {
    this.createAndStoreResult();
    return this.createMappingResult();
  }

  get type() {
    return this.configType || this.baseType;
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {};
  }
}

module.exports = {
  $default,
  MappingBaseType,
  ConvertMappingSchemaError
};
