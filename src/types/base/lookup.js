const createLookupObject = config => new LookupObject(config);

class LookupObject {
  constructor(
    { key, value, parentName, resultKeyName, typeName },
    config = {}
  ) {
    this.key = key;
    this.resultKeyName = resultKeyName;
    this.parentName = parentName;
    this.config = config;
    this.value = value;
    this.typeName = typeName;
  }

  get lookupObj() {
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
