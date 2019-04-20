const createLookupObject = (opts, config) => new LookupObject(opts, config);

class LookupObject {
  constructor(opts, config = {}) {
    const { key, value, parentName, resultKeyName, typeName } = opts;
    this.key = key;
    this.resultKeyName = resultKeyName;
    this.parentName = parentName;
    this.config = config;
    this.value = value;
    this.typeName = typeName;
  }

  get object() {
    const obj = {
      key: this.key,
      resultKey: this.resultKeyName,
      parentName: this.parentName,
      schemaValue: this.value
    };
    if (this.typeName) {
      obj.typeName = this.typeName;
    }
    return obj;
  }
}

module.exports = {
  createLookupObject,
  LookupObject
};
