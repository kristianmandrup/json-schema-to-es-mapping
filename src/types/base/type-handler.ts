import { InfoHandler } from "../info";
import { isStringType, isEmptyObj } from "../util";
export const createTypeHandler = (opts, config: any = {}) =>
  new TypeHandler(opts, config);

export class TypeHandler extends InfoHandler {
  entry: any;
  opts: any;
  typeName: string;
  calcType: () => string;

  constructor(opts: any = {}, config: any = {}) {
    super(config);
    const { typeName, entry, calcType, type } = opts;
    this.opts = opts;
    this.typeName = typeName;
    this.entry = entry || {};
    const $calcType = () => type || this.type;
    this.calcType = calcType || $calcType;
    this.validate();
  }

  validate() {
    if (!isStringType(this.calcType)) {
      this.error(
        "validate",
        "calcType does not have sufficient info to calculate type",
        {
          opts: this.opts,
          calcType: this.calcType,
          type: this.type,
          typeMap: this.typeMap,
          typeName: this.typeName,
          typeValue: (this.typeMap || {})[this.typeName],
          entry: this.entry
        }
      );

      if (isEmptyObj(this.typeMap)) {
        this.error("empty typeMap", this.typeMap);
      }
      if (isEmptyObj(this.entry)) {
        this.error("empty entry", this.entry);
      }
      if (isStringType(this.typeName)) {
        this.error("invalid or missing typeName", this.typeName);
      }
    }
  }

  get typeMapValue() {
    return this.typeMap[this.typeName];
  }

  get typeMap() {
    return this.config.typeMap || {};
  }

  get type() {
    return this.entryType || this.typeMapValue;
  }

  get entryType() {
    return this.entry.type;
  }
}
