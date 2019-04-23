const { InfoHandler } = require("../../info");
const createKeyMaker = config => new KeyMaker(config);

class KeyMaker extends InfoHandler {
  constructor(opts, config = {}) {
    super(config);
    const { key, parentName } = opts;
    this.nameSeparator = config.nameSeparator || this.defaultNameSeparator;
    this.parentName = parentName;
    this.key = key;
    this.nestedKey = config.nestedKey || this.calcNestedKey.bind(this);
  }

  get defaultNameSeparator() {
    return "_";
  }

  get resultKey() {
    return this.nested ? this.nestedKey() : this.key;
  }

  calcNestedKey() {
    return [this.parentName, this.key].join(this.nameSeparator);
  }
}

module.exports = {
  createKeyMaker,
  KeyMaker
};
