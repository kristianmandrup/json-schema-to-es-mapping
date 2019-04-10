const {
  toString,
  toNumber,
  toBoolean,
  toArray,
  toObject,
  toDate,
  toNumericRange,
  toDateRange,
  toNestedObject,
  toReferenceObject
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
      date: toDate
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
      this.dateRange(config) ||
      this.numericRange(config) ||
      this.number(config) ||
      this.boolean(config) ||
      this.array(config) ||
      this.object(config) ||
      this.date(config) ||
      this.defaultTypeHandler(config)
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

  numericRange(config) {
    return toNumericRange(config || this.obj);
  }

  dateRange(config) {
    return toDateRange(config || this.obj);
  }

  boolean(config) {
    return toBoolean(config || this.obj);
  }

  array(config) {
    return toArray(config || this.obj);
  }

  object(config) {
    const obj = config || this.obj;
    return toNestedObject(obj) || toReferenceObject(obj) || toObject(obj);
  }

  date(config) {
    return toDate(config || this.obj);
  }

  defaultTypeHandler(config) {
    this.error(`No type matched for type: ${this.type}`, {
      obj: this.obj,
      config
    });
  }
}

module.exports = {
  SchemaEntryError,
  SchemaEntry
};
