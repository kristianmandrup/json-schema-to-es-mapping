const {
  toString,
  toNumber,
  toBoolean,
  toArray,
  toObject,
  toMixed,
  toDate
} = require("./types");

class SchemaEntryError extends Error {}

class SchemaEntry {
  constructor(obj, config = {}) {
    const { parentName, key, value } = obj;
    this.parentName = parentName;
    this.key = key;
    this.value = value;
    this.config = config;
    this.type = value.type;

    this.defaultTypes = {
      string: toString,
      number: toNumber,
      boolean: toBoolean,
      array: toArray,
      object: toObject,
      date: toDate,
      mixed: toMixed
    };

    this.types = {
      ...this.defaultTypes,
      ...(config.types || {})
    };
  }

  isValidSchema() {
    return typeof this.type === "string";
  }

  error(msg) {
    throw new SchemaEntryError(msg);
  }

  toEntry() {
    if (!this.isValidSchema()) this.error("Not a valid schema");
    const config = this.obj;
    return (
      this.string(config) ||
      this.number(config) ||
      this.boolean(config) ||
      this.array(config) ||
      this.object(config) ||
      this.date(config) ||
      this.mixed(config)
    );
  }

  get obj() {
    return {
      parentName: this.parentName,
      key: this.key,
      value: this.value,
      type: this.type,
      config: this.config
    };
  }

  string(config) {
    return toString(config || this.obj);
  }

  number(config) {
    return toNumber(config || this.obj);
  }

  boolean(config) {
    return toBoolean(config || this.obj);
  }

  array(config) {
    return toArray(config || this.obj);
  }

  object(config) {
    return toObject(config || this.obj);
  }

  date(config) {
    return toDate(config || this.obj);
  }

  mixed(config) {
    return toMixed(config || this.obj);
  }
}

module.exports = {
  SchemaEntryError,
  SchemaEntry
};
