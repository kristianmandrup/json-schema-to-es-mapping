const { MappingBaseType } = require("./base");
const { isDate } = require("./util");

function toDate(obj) {
  return isDate(obj) && MappingDate.create(obj).convert();
}

class MappingDate extends MappingBaseType {
  get baseType() {
    return "date";
  }

  static create(obj) {
    return new MappingDate(obj);
  }
}

module.exports = {
  toDate,
  MappingDate
};
