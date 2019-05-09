import { MappingBaseType } from "../base";
import { isBoolean } from "../util";
export { isBoolean };

export function toBoolean(obj) {
  return isBoolean(obj.type) && MappingBoolean.create(obj).convert();
}

export class MappingBoolean extends MappingBaseType {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  init() {
    return super.init();
  }

  get baseType() {
    return "boolean";
  }

  get typeName() {
    return "boolean";
  }

  static create(obj) {
    return new MappingBoolean(obj).init();
  }
}
