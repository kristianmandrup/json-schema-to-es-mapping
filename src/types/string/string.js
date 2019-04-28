const { MappingBaseType } = require("../base");
const { isString } = require("../util");

function toString(obj) {
  if (!isString(obj.type)) return;
  const mapper = MappingString.create(obj);
  const mapping = mapper.convert();
  console.log({ mapping });
  return mapping;
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
