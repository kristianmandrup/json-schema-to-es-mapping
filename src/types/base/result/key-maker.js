const createKeyMaker = config => new KeyMaker(config);

class KeyMaker {
  constructor({ key, parentName }, config) {
    this.nestedKey = config.nestedKey || this.nestedKey;
    this.nameSeparator = config.nameSeparator || this.defaultNameSeparator;
    this.parentName = parentName;
    this.key = key;
  }

  get defaultNameSeparator() {
    return "_";
  }

  resultKey() {
    return this.nested ? this.nestedKey(this) : this.key;
  }

  nestedKey() {
    return [this.parentName, this.key].join(this.nameSeparator);
  }
}

module.exports = {
  createKeyMaker,
  KeyMaker
};
