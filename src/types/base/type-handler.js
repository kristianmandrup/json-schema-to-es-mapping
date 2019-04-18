const createReferenceResolver = config => new ReferenceResolver(config);

class TypeHandler extends Info {
  constructor({ typeName }, config) {
    this.typeName = typeName;
    super(config);
  }

  get baseType() {
    this.error("default mapping type must be specified by subclass");
  }

  get typeName() {
    this.error("typeName must be specified by subclass");
  }

  get types() {
    return this.config.typeMap || {};
  }

  get entry() {}

  get configType() {
    return (this.entry || {}).type || this.metaType;
  }

  metaType() {
    return this.typeMap[this.typeName];
  }
}

module.exports = {
  createTypeHandler,
  TypeHandler
};
