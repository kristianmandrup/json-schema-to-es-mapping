import { MappingRange } from "./range";
import { isDateRange } from "../util";

export function toDateRange(obj) {
  return isDateRange(obj) && MappingDateRange.create(obj).convert();
}

// date_range

export class MappingDateRange extends MappingRange {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  init() {
    return super.init();
  }

  static create(obj) {
    return new MappingDateRange(obj).init();
  }

  get baseType() {
    return "date_range";
  }

  get type() {
    return this.baseType;
  }
}
