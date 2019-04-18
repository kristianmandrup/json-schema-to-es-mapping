const { InfoHandler } = require("../info");
const { $default } = require("../default");
const { createKeyMaker, createDispatcher, createResultHandler } = require("./result"),

class ConvertMappingSchemaError extends Error {}

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
    this.config = {
      ...$default.config,
      ...config
    };

    this.keyMaker = createKeyMaker({key, parentName}, config) 
    this.dispatcher = createDispatcher(config)
    this.resultHandler = createResultHandler(config)

    this.nested = config.nested;
    this.nestingLv = config.nestingLv;
  }

  dispatch() {
    this.dispatcher.dispatch(this.dispatchObj);
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
