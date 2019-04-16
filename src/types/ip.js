const { MappingBase } = require("./base");

const isIp = (obj) => false

function toIp(obj) {
  return isIp(obj) && MappingIp.create(obj).convert();
}

// integer_range, float_range, long_range, double_range

class MappingIp extends MappingBase {
  get baseType() {
    return "ip";
  }
}

module.exports = {
  toIp,
  MappingIp
};
