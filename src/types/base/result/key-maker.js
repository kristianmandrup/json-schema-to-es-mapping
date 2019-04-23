const { isStringType } = require("../../util");
const { InfoHandler } = require("../../info");
const createKeyMaker = (opts, config) => new KeyMaker(opts, config);

class KeyMaker extends InfoHandler {
  constructor(opts = {}, config = {}) {
    super(config);
    const { key, parentName } = opts;
    this.nameSeparator = config.nameSeparator || this.defaultNameSeparator;
    this.parentName = parentName;
    this.key = key;
  }

  set key(key) {
    if (!isStringType(key)) {
      this.error("set key", `Invalid or missing key ${key}`);
    }
    this._key = key;
  }

  get key() {
    return this._key;
  }

  get defaultNameSeparator() {
    return "_";
  }

  get nestedKey() {
    return this.config.nestedKey
      ? this.config.nestedKey()
      : this.calcNestedKey();
  }

  get resultKey() {
    return this.nested ? this.nestedKey() : this.key;
  }

  calcNestedKey() {
    return this.parentName
      ? [this.parentName, this.key].join(this.nameSeparator)
      : this.key;
  }
}

module.exports = {
  createKeyMaker,
  KeyMaker
};
