const { InfoHandler } = require("../info");
const createTypeHandler = (opts, config) => new TypeHandler(opts, config);

class TypeHandler extends InfoHandler {
  constructor({ typeName, entry }, config) {
    super(config);
    this.typeName = typeName;
    this.entry = entry || {};
  }

  get baseType() {
    this.error("default mapping type must be specified by subclass");
  }

  get typeMap() {
    return this.config.typeMap || {};
  }

  get type() {
    return this.entry.type || this.metaType;
  }

  get metaType() {
    return this.typeMap[this.typeName];
  }
}

module.exports = {
  createTypeHandler,
  TypeHandler
};
