const { isFunction } = require("./util");

class ConvertMappingSchemaError extends Error {}

class InfoHandler {
  constructor(config = {}) {
    this.config = config || this.config;
  }

  errMessage(errKey = "default") {
    return this.message[errKey] || "error";
  }

  error(name, msg, data) {
    const errMsg = `[${name}] ${msg}`;
    this.onError(errMsg, data);
    throw new ConvertMappingSchemaError(errMsg);
  }

  onError(errMsg, data) {
    const onError = this.config.onError;
    if (!isFunction(onError)) return;
    onError(errMsg, data);
  }
}

module.exports = {
  InfoHandler
};
