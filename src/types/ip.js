const { MappingBaseType } = require("./base");
const { isString } = require("./util");

const isIpKey = name => [/^ip/].find(expr => expr.test(name));

const isIp = (obj, key) => {
  return isString(obj.type) && isIpKey(obj.key || key);
};

function toIp(obj) {
  return isIp(obj) && MappingIp.create(obj).convert();
}

class MappingIp extends MappingBaseType {
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
  isIpKey,
  isIp,
  toIp,
  MappingIp
};
