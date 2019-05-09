const { InfoHandler } = require("../info");
const { isStringType, isEmptyObj } = require("../util");
const createTypeHandler = (opts, config) => new TypeHandler(opts, config);

class TypeHandler extends InfoHandler {
  constructor(opts = {}, config) {
    super(config);
    const { typeName, entry, calcType, type } = opts;
    this.opts = opts;
    this.typeName = typeName;
    this.entry = entry || {};
    const $calcType = () => type || this.type;
    this.calcType = calcType || $calcType;
  }

  validate() {
    if (!isStringType(this.calcType)) {
      this.error(
        "validate",
        "calcType does not have sufficient info to calculate type",
        {
          opts: this.opts
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

  get baseType() {
    this.error("default mapping type must be specified by subclass");
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

module.exports = {
  createTypeHandler,
  TypeHandler
};
