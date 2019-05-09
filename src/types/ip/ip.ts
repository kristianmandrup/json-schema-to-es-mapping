import { MappingBaseType } from "../base";
import { isString } from "../util";

export const isIpKey = name => [/^ip/].find(expr => expr.test(name));

export const isIp = (obj, key?: string) => {
  return isString(obj.type) && isIpKey(obj.key || key);
};

export function toIp(obj) {
  return isIp(obj) && MappingIp.create(obj).convert();
}

export class MappingIp extends MappingBaseType {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  init() {
    return super.init();
  }

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
