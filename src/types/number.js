const { MappingBaseType } = require("./base");
const { isNumber } = require("./util");

function toNumber(obj) {
  return isNumber(obj.type) && MappingNumber.create(obj).convert();
}

class MappingNumber extends MappingBaseType {
  get baseType() {
    return this._types.number || "integer";
  }

  static create(obj) {
    return new MappingNumber(obj);
  }
}

module.exports = {
  toNumber,
  MappingNumber
};
