const { MappingRange } = require("./range");
const { isNumber, safeToFloat, safeToInt } = require("./util");

function toNumber(obj) {
  return isNumber(obj.type) && MappingNumber.create(obj).convert();
}

const INT_MAX = Math.pow(2, 31);

class MappingNumber extends MappingRange {
  get baseType() {
    return this._types.number || "float";
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

  get maxExcl() {
    return safeToInt(this.exclusiveMaximum, INT_MAX - 1);
  }

  get maxIncl() {
    return safeToInt(this.maximum, INT_MAX - 1);
  }

  get minExcl() {
    return safeToInt(this.value.exclusiveMinimum, 0);
  }

  get minIncl() {
    return safeToInt(this.value.minimum, 0);
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

  get isDouble() {
    return this.isFloating && this.numType === "double" && this.isLong;
  }

  get isFloat() {
    return this.isFloating;
  }

  get precision() {
    return safeToFloat(this.value.multipleOf, 1);
  }

  get isFloating() {
    return this.precision < 1;
  }

  get numType() {
    return this.value.numType;
  }

  get isHalfFloat() {
    return this.isFloating && this.numType === "half-float";
  }

  inPosNegRange(max) {
    return this.inRange(-(max + 1), max);
  }

  get isByte() {
    return this.inPosNegRange(127);
  }

  get isShort() {
    return this.inPosNegRange(32767);
  }

  get isInteger() {
    return this.inPosNegRange(INT_MAX);
  }

  get isLong() {
    return this.max >= INT_MAX || this.min <= -(INT_MAX + 1);
  }

  get type() {
    return this.configType || this.calcNumericType || this.baseType;
  }

  static create(obj) {
    return new MappingNumber(obj);
  }
}

module.exports = {
  toNumber,
  MappingNumber
};
