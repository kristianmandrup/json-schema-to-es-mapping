const { isFunction } = require("util");

class ConvertMappingSchemaError extends Error {}

const $default = {
  config: {
    _meta_: {
      types: {
        string: "keyword",
        number: "integer",
        object: "object",
        array: "nested",
        boolean: "boolean",
        date: "date"
      }
    },
    fields: {
      name: {
        type: "text"
      },
      content: {
        type: "text"
      },
      text: {
        type: "text"
      },
      title: {
        type: "text"
      },
      caption: {
        type: "text"
      },
      label: {
        type: "text"
      }
    }
  }
};

class MappingBaseType {
  constructor({ parentName, key, value, result, config }) {
    this.parentName = parentName;
    this.key = key;
    this.value = value;
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
    return {
      key: this.key,
      resultKey: this.resultKeyName,
      parentName: this.parentName,
      schemaValue: this.value
    };
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

  errMessage(errKey = "default") {
    return this.message[errKey] || "error";
  }

  error(name, msg) {
    const errMsg = `[${name}] ${msg}`;
    this.onError(errMsg);
    throw new ConvertMappingSchemaError(errMsg);
  }

  onError(errMsg) {
    const onError = this.config.onError;
    if (!isFunction(onError)) return;
    onError(errMsg);
  }
}

module.exports = {
  MappingBaseType,
  ConvertMappingSchemaError
};
