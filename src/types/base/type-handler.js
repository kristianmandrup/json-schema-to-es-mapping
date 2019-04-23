const createReferenceResolver = config => new ReferenceResolver(config);

class TypeHandler extends Info {
  constructor({ typeName, entry }, config) {
    this.typeName = typeName;
    this.entry = entry || {};
    super(config);
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

  metaType() {
    return this.typeMap[this.typeName];
  }
}

module.exports = {
  createTypeHandler,
  TypeHandler
};
