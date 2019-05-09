const { MappingBaseType } = require("../base");
const { safeToInt } = require("../util");

const INT_MAX = Math.pow(2, 31);

class MappingRange extends MappingBaseType {
  constructor(opts) {
    super(opts);
    const minFn = this.exclusiveMinimum
      ? this.inMinRangeExcl
      : this.inMinRangeIncl;
    this.minFn = minFn.bind(this);
    const maxFn = this.exclusiveMaximum
      ? this.inMaxRangeExcl
      : this.inMaxRangeIncl;
    this.maxFn = maxFn.bind(this);
  }

  get exclusiveMaximum() {
    return this.value.exclusiveMaximum || this.value.exclMax;
  }

  get maximum() {
    return this.value.maximum || this.value.max;
  }

  get exclusiveMinimum() {
    return this.value.exclusiveMinimum || this.value.exclMin;
  }

  get minimum() {
    return this.value.minimum || this.value.min;
  }

  get maxExcl() {
    return safeToInt(this.exclusiveMaximum, INT_MAX - 1);
  }

  get maxIncl() {
    return safeToInt(this.maximum, INT_MAX - 1);
  }

  get minExcl() {
    return safeToInt(this.exclusiveMinimum, -INT_MAX);
  }

  get minIncl() {
    return safeToInt(this.minimum, -INT_MAX);
  }

  inMinRangeExcl(min) {
    return this.minExcl > min;
  }

  inMinRangeIncl(min) {
    return this.minIncl >= min;
  }

  inMaxRangeExcl(max) {
    return this.maxExcl < max;
  }

  inMaxRangeIncl(max) {
    return this.maxIncl <= max;
  }

  inRange(min, max) {
    return this.minFn(min) && this.maxFn(max);
  }

  outsideRange(min, max) {
    return !this.inRange(min, max);
  }
}

module.exports = {
  MappingRange
};