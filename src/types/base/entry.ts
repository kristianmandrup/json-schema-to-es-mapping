import { createLookupObject } from "./lookup";
import { InfoHandler } from "../info";

export const createEntryObj = (opts, config = {}) => new EntryObj(opts, config);

export class EntryObj extends InfoHandler {
  key: string;
  nestedKey: string;
  entryFor: (obj: any) => any;
  lookupObj: any; // ILookupObj

  constructor(opts, config: any = {}) {
    super(config);
    const { key, nestedKey } = opts;
    this.key = key;
    this.nestedKey = nestedKey;
    this.entryFor = config.entryFor;
    this.lookupObj = createLookupObject(opts, config);
  }

  get entry() {
    return this.lookedUpEntry || this.configEntry || {};
  }

  get type() {
    return this.entry.type;
  }

  get lookedUpEntry() {
    const { entryFor } = this;
    return entryFor && entryFor(this.lookupObj);
  }

  get fields() {
    return this.config.fieldMap || {};
  }

  get configFieldEntry() {
    return this.fields[this.key] || this.fields[this.nestedKey];
  }

  get configEntry() {
    return this.configFieldEntry;
  }
}
