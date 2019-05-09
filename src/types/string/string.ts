import { MappingBaseType } from "../base";
import { isString } from "../util";
export { isString };

export function toString(obj) {
  if (!isString(obj.type)) return;
  const mapper = MappingString.create(obj);
  const mapping = mapper.convert();
  console.log({ mapping });
  return mapping;
}

export class MappingString extends MappingBaseType {
  constructor(opts, config = {}) {
    super(opts, config);
  }

  init() {
    return super.init();
  }

  get baseType() {
    return "keyword";
  }

  get typeName() {
    return "string";
  }

  static create(obj) {
    return new MappingString(obj).init();
  }
}
