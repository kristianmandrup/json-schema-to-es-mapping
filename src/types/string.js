const { MappingBaseType } = require("./base");

function isString(type) {
  return type === "string";
}

function toString(obj) {
  return isString(obj.type) && MappingString.create(obj).convert();
}

class MappingString extends MappingBaseType {
  get baseType() {
    return this._types.string || "keyword";
  }

  get typeName() {
    return "string";
  }

  static create(obj) {
    return new MappingString(obj);
  }
}

module.exports = {
  toString,
  MappingString
};
