const { MappingBaseType } = require("./base");
const { safeToInt } = require("./util");

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
    return this.value.exclusiveMaximum;
  }

  get maximum() {
    return this.value.maximum;
  }

  get exclusiveMinimum() {
    return this.value.exclusiveMinimum;
  }

  get minimum() {
    return this.value.minimum;
  }

  get maxExcl() {
    return safeToInt(this.exclusiveMaximum, INT_MAX - 1);
  }

  get maxIncl() {
    return safeToInt(this.maximum, INT_MAX - 1);
  }

  get minExcl() {
    return safeToInt(this.exclusiveMinimum, 0);
  }

  get minIncl() {
    return safeToInt(this.minimum, 0);
  }

  inMinRangeExcl(min) {
    return this.minExcl > min;
  }

  inMinRangeIncl(min) {
    return this.minIncl >= min;
  }

  inMaxRangeExcl(max) {
    return this.maxExcl > max;
  }

  inMaxRangeIncl(max) {
    return this.maxIncl >= max;
  }

  inRange(min, max) {
    return this.maxFn(max) && this.minFn(min);
  }

  outsideRange(min, max) {
    return this.max >= max || this.min <= min;
  }
}

module.exports = {
  MappingRange
};
