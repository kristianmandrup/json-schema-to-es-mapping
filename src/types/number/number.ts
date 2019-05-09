import { MappingRange } from "../range";
import { isNumber, safeToFloat, safeToInt } from "../util";
export { isNumber };

export function toNumber(obj) {
  return isNumber(obj.type) && MappingNumber.create(obj).convert();
}

export const INT_MAX = Math.pow(2, 31);
export const NEG_INT_MAX = -(INT_MAX + 1);

export class MappingNumber extends MappingRange {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  get baseType() {
    return "float";
  }

  get typeName() {
    return "number";
  }

  get calcNumericType() {
    return (
      this.double ||
      this.halfFloat ||
      this.float ||
      this.byte ||
      this.short ||
      this.integer ||
      this.long ||
      this.baseType
    );
  }

  get double() {
    return this.isDouble && "double";
  }

  get halfFloat() {
    return this.isHalfFloat && "half_float";
  }

  get float() {
    return this.isFloat && "float";
  }

  get byte() {
    return this.isByte && "byte";
  }

  get short() {
    return this.isShort && "short";
  }

  get integer() {
    return this.isInteger && "integer";
  }

  get long() {
    return this.isLong && "long";
  }

  get isFloating() {
    return this.precision < 1;
  }

  get isDouble() {
    return this.numType === "double" || (this.isFloating && this.isLong);
  }

  get isFloat() {
    return this.numType === "float" || this.isFloating;
  }

  get isHalfFloat() {
    return this.numType === "half-float" && this.isFloating;
  }

  get isByte() {
    return this.numType === "byte" || this.inPosNegRange(127);
  }

  get isShort() {
    return this.numType === "short" || this.inPosNegRange(32767);
  }

  get isInteger() {
    return (
      this.numType === "int" ||
      this.numType === "integer" ||
      this.inPosNegRange(INT_MAX)
    );
  }

  get isLong() {
    return (
      this.numType === "long" || this.outsideRange(-(INT_MAX + 1), INT_MAX)
    );
  }

  get precision() {
    return safeToFloat(this.value.multipleOf, 1);
  }

  get numType() {
    return this.value.numType;
  }

  inPosNegRange(max) {
    const min = -(max + 1);
    return this.inRange(min, max);
  }

  get type() {
    return this.formatType || this.calcNumericType || this.baseType;
  }

  get formatType() {
    return (
      this.numericFormat[this.format] || this.numericFormat[this.value.type]
    );
  }

  get numericFormat() {
    return {
      integer: "integer"
    };
  }

  static create(obj) {
    return new MappingNumber(obj).init();
  }
}
