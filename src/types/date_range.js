const { MappingRange } = require("./range");
const { isDateRange } = require("./util");

function toDateRange(obj) {
  return isDateRange(obj) && MappingDateRange.create(obj).convert();
}

// date_range

class MappingDateRange extends MappingRange {
  get baseType() {
    return "date_range";
  }

  get type() {
    return this.baseType;
  }
}

module.exports = {
  toDateRange,
  MappingDateRange
};
