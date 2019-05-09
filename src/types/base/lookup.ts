import { InfoHandler } from "../info";
export const createLookupObject = (opts, config) =>
  new LookupObject(opts, config);

export class LookupObject extends InfoHandler {
  opts: any;
  parentName: string;
  key: string;
  format: string;
  schema: any;
  result: any;
  typeName: string;
  resultKeyName: string;
  value: any;

  constructor(opts, config: any = {}) {
    super(config);
    const { key, value, parentName, resultKeyName, typeName } = opts;
    this.key = key;
    this.resultKeyName = resultKeyName;
    this.parentName = parentName;
    this.value = value;
    this.typeName = typeName;
  }

  // IObject
  get object() {
    const obj: any = {
      key: this.key,
      resultKey: this.resultKeyName,
      parentName: this.parentName,
      schemaValue: this.value
    };
    if (this.typeName) {
      obj.typeName = this.typeName;
    }
    return obj;
  }
}
