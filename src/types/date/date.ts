import { MappingBaseType } from "../base";
import { isDate } from "../util";
export { isDate };

export function toDate(obj) {
  return isDate(obj) && MappingDate.create(obj).convert();
}

export class MappingDate extends MappingBaseType {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  get baseType() {
    return "date";
  }

  get typeName() {
    return "date";
  }

  static create(obj) {
    return new MappingDate(obj).init();
  }
}
