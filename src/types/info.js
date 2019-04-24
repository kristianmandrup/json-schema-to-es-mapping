const { isFunction } = require("./util");

class ConvertMappingSchemaError extends Error {}

class InfoHandler {
  constructor(config = {}) {
    this.config = config || this.config;
    this.logging = config.logging;
    this.log = config.log || console.log;
  }

  errMessage(errKey = "default") {
    return this.message[errKey] || "error";
  }

  captionedMsg(name, msg) {
    return `[${this.constructor.name}:${name}] ${msg}`;
  }

  info(name, msg, data) {
    if (!this.logging) return;
    const infoMsg = this.captionedMsg(name, msg);
    const log = this.log;
    data ? log(infoMsg, data) : log(infoMsg);
  }

  error(name, msg, data) {
    const errMsg = this.captionedMsg(name, msg);
    this.info(name, msg, data);
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
