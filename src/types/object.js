const { MappingBaseType } = require("./base");
const { isObject } = require("./util");

function toObject(obj) {
  return isObject(obj) && MappingObject.create(obj).convert();
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  get baseType() {
    return "object";
  }

  constructor(obj) {
    super(obj);
    this.properties = this.value.properties;
  }

  static create(obj) {
    return new MappingObject(obj);
  }

  convert() {
    const { buildMapping } = this.config;
    return this.properties ? buildMapping(this.value) : {};
  }
}

module.exports = {
  toObject,
  MappingObject
};
