const { MappingBaseType } = require("./base");
const { safeToInt } = require("./util");

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
}

module.exports = {
  MappingRange
};
