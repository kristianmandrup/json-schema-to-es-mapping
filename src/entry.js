const types = require("./types");
const {
  toString,
  toNumber,
  toBoolean,
  toArray,
  toObject,
  toDate,
  toIp,
  toGeoPoint,
  toNumericRange,
  toDateRange,
  obj,
  chooseObjMapper,
  AnyOfMapper
} = types;
const { InfoHandler } = require("./types/info");
const { isFunction, isStringType } = require("./types/util");

class SchemaEntryError extends Error {}

class SchemaEntry extends InfoHandler {
  constructor(obj, config = {}) {
    super(config);
    const { parentName, key, value } = obj;
    this.parentName = parentName;
    this.key = key;
    this.value = value;
    this.config = config;
    this.type = value.type;
    this.defaults = {
      types: {
        ip: toIp,
        point: toGeoPoint,
        string: toString,
        number: toNumber,
        boolean: toBoolean,
        array: toArray,
        object: toObject,
        date: toDate,
        dateRange: toDateRange,
        numericRange: toNumericRange
      },
      typeOrder: [
        "ip",
        "point",
        "string",
        "dateRange",
        "numericRange",
        "number",
        "boolean",
        "array",
        "object",
        "date"
      ]
    };

    this.types = {
      ...this.defaults.types,
      ...(config.types || {})
    };
    this.typeOrder = config.typeOrder || this.defaults.typeOrder;
  }

  get typeObjMapperFor() {
    return chooseObjMapper;
  }

  isValidSchema() {
    return typeof this.type === "string";
  }

  toEntry() {
    const type = this.type;
    return isStringType(type)
      ? this.toEntryStringType(type)
      : this.toEntryObjType(type);
  }

  toEntryObjType() {
    const keys = Object.keys(this.type);
    const key = keys[0];
    const mapperFn = this.typeObjMapperFor(key);
    if (!isFunction(mapperFn)) {
      this.error("toEntryObjType", `Invalid type obj key ${key}`, {
        mapperFn,
        key,
        typeObj: this.typeObj
      });
    }
    foundValue = mapperFn(this.obj, { key: this.key, type: this.type });
    return foundValue;
  }

  toEntryStringType(type) {
    type = type || this.type;
    if (!this.isValidSchema()) {
      this.error("toEntryStringType", `Not a valid schema: type ${type}`, {
        value: this.value
      });
    }
    let foundValue;
    this.typeOrder.find(type => {
      const typeFn = this.types[type];
      if (!typeFn) {
        this.info("toEntryStringType", `skipped ${type}`);
        return false;
      }
      if (!isFunction(typeFn)) {
        this.error("toEntryStringType", `Invalid type function ${type}`, {
          typeFn,
          type,
          typeOrder: this.typeOrder
        });
      }
      foundValue = typeFn(this.obj, this.key);
      return foundValue;
    });
    return foundValue || this.defaultTypeHandler(config);
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
