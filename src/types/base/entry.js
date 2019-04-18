const { createLookupObject } = require("./lookup");

const createEntryObj = (opts, config = {}) => new EntryObj(opts, config);

class EntryObj {
  constructor(opts, config = {}) {
    const { key, nestedKey } = opts;
    this.key = key;
    this.config = config;
    this.nestedKey = nestedKey;
    this.entryFor = config.entryFor;
    this.lookupObj = createLookupObject(opts);
  }

  get entry() {
    return this.lookedUpEntry || this.configEntry || {};
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

module.exports = {
  createEntryObj,
  EntryObj
};
