import { MappingNumber } from "../number";
import { isNumericRange } from "../util";

export function toNumericRange(obj) {
  return isNumericRange(obj) && MappingNumericRange.create(obj).convert();
}

// integer_range, float_range, long_range, double_range

export class MappingNumericRange extends MappingNumber {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  init() {
    return this;
  }

  static create(obj) {
    return new MappingNumericRange(obj).init();
  }

  get baseType() {
    return "float_range";
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
    return this.calcNumericType || this.baseType;
  }
}
