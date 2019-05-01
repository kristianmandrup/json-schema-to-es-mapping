const { InfoHandler } = require("../info");
const createTypeHandler = (opts, config) => new TypeHandler(opts, config);

class TypeHandler extends InfoHandler {
  constructor({ typeName, entry, calcType, type }, config) {
    super(config);
    this.typeName = typeName;
    this.entry = entry || {};
    const $calcType = () => type || this.type;
    this.calcType = calcType || $calcType;
  }

  get baseType() {
    this.error("default mapping type must be specified by subclass");
  }

  get typeMapValue() {
    return (this.typeMap || {})[this.typeName];
  }

  get typeMap() {
    return this.config.typeMap || {};
  }

  get type() {
    return this.entry.type || this.typeMapValue;
  }
}

module.exports = {
  createTypeHandler,
  TypeHandler
};
