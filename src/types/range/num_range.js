const { MappingNumber } = require("./number");
const { isNumericRange } = require("./util");

function toNumericRange(obj) {
  return isNumericRange(obj) && MappingNumericRange.create(obj).convert();
}

// integer_range, float_range, long_range, double_range

class MappingNumericRange extends MappingNumber {
  get baseType() {
    return this._types.range || "float_range";
  }

  get type() {
    return this.rangeMap[this.numericType] || this.baseType;
  }

  get rangeMap() {
    return {
      byte: "integer_range",
      short: "integer_range",
      integer: "integer_range",
      long: "long_range",
      float: "float_range",
      half_float: "float_range",
      double: "double_range"
    };
  }

  get numericType() {
    return this.configType || this.calcNumericType || this.baseType;
  }
}

module.exports = {
  toNumericRange,
  MappingNumericRange
};
