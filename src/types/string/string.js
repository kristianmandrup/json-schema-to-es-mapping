const { MappingBaseType } = require("./base");
const { isString } = require("./util");

function toString(obj) {
  return isString(obj.type) && MappingString.create(obj).convert();
}

class MappingString extends MappingBaseType {
  get baseType() {
    return "keyword";
  }

  get typeName() {
    return "string";
  }

  static create(obj) {
    return new MappingString(obj).init();
  }
}

module.exports = {
  isString,
  toString,
  MappingString
};
