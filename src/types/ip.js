const { MappingBase } = require("./base");

const isIpKey = name => [/^ip/].find(expr => expr.test(name));

const isIp = (obj, key) => {
  return isString(obj.type) && isIpKey(key);
};

function toIp(obj) {
  return isIp(obj) && MappingIp.create(obj).convert();
}

class MappingIp extends MappingBase {
  get baseType() {
    return "ip";
  }

  get typeName() {
    return "ip";
  }

  static create(obj) {
    return new MappingIp(obj).init();
  }
}

module.exports = {
  isIp,
  toIp,
  MappingIp
};
