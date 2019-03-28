const { isFunction } = require("util");

class ConvertMappingSchemaError extends Error {}

const $default = {
  config: {
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
};

class MappingBaseType {
  constructor({ parentName, key, value, config }) {
    this.parentName = parentName;
    this.key = key;
    this.value = value;
    this.format = value.format;
    this.config = {
      ...$default.config,
      ...config
    };
    this.nested = config.nested;
    this.nestingLv = config.nestingLv;
    this._meta = this.config._meta_ || {};
    this._types = this._meta.types || {};
  }

  setResultObj(result) {
    this.config.resultObj[this.key] = result;
  }

  get resultKey() {
    return this.nested ? this.nestedKey : this.key;
  }

  get nestedKey() {
    return [this.parentName, this.key].join("_");
  }

  get resultObj() {
    this.config.resultObj = this.config.resultObj || {};
    return this.config.resultObj[this.resultKey];
  }

  setResultObj(result) {
    this.config[this.resultKey] = result;
  }

  setResult(result) {
    this.setResultObj(result);
    this.onResult(result);
  }

  onResult(result) {
    const onResult = this.config.onResult;
    if (isFunction(onResult)) {
      onResult({
        parentName: this.parentName,
        key: this.key,
        resultKey: this.resultKey,
        ...result
      });
    }
  }

  get baseType() {
    this.error("default mapping type must be specified by subclass");
  }

  get configEntry() {
    return this.config[this.key] || {};
  }

  get configType() {
    return this.configEntry.type;
  }

  createResult() {
    return {
      ...this.configEntry,
      type: this.type
    };
  }

  createAndStoreResult() {
    const result = this.createResult();
    this.setResult(result);
    return result;
  }

  convert() {
    return this.createAndStoreResult();
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
    const errMSg = `[${name}] ${msg}`;
    console.log(errMSg);
    throw new ConvertMappingSchemaError(errMSg);
  }
}

module.exports = {
  MappingBaseType,
  ConvertMappingSchemaError
};
