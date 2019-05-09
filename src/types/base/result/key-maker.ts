import { isStringType } from "../../util";
import { InfoHandler } from "../../info";
export const createKeyMaker = (opts, config) => new KeyMaker(opts, config);

export class KeyMaker extends InfoHandler {
  opts: any;
  nameSeparator: string;
  parentName: string;
  nested: boolean;
  protected _key: string;

  constructor(opts: any = {}, config: any = {}) {
    super(config);
    const { key, parentName, nested } = opts;
    this.opts = opts;
    this.nameSeparator = config.nameSeparator || this.defaultNameSeparator;
    this.parentName = parentName;
    this.key = key;
    this.nested = nested;
  }

  get ctx() {
    return {
      opts: this.opts,
      config: this.config
    };
  }

  set key(key) {
    if (!isStringType(key)) {
      this.error("set key", `Invalid or missing key ${key}`, this.ctx);
    }
    this._key = key;
  }

  get key() {
    return this._key;
  }

  get defaultNameSeparator() {
    return "_";
  }

  get nestedKey() {
    return this.config.nestedKey
      ? this.config.nestedKey()
      : this.calcNestedKey();
  }

  get resultKey() {
    return this.nested ? this.nestedKey() : this.key;
  }

  calcNestedKey() {
    return this.parentName
      ? [this.parentName, this.key].join(this.nameSeparator)
      : this.key;
  }
}
