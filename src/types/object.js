const { MappingBaseType } = require("./base");
const { isObject, isObjectType } = require("./util");

function toObject(obj) {
  return isObject(obj) && MappingObject.create(obj).convert();
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  get baseType() {
    return "object";
  }

  constructor(obj) {
    super(obj);
    this.properties = this.value.properties;
  }

  static create(obj) {
    return new MappingObject(obj);
  }

  createResult() {
    return this.hasProperties
      ? this.buildObjectValueMapping()
      : this.defaultObjectValueMapping;
  }

  buildObjectValueMapping() {
    const { buildMapping } = this.config;
    return buildMapping(this.objectValue, this.mappingConfig);
  }

  get incNestingLevel() {
    let nestingLevel = this.config.nestingLevel || 0;
    return nestingLevel++;
  }

  get mappingConfig() {
    return {
      name: this.key,
      nestingLv: this.incNestingLevel,
      nested: true,
      ...this.config
    };
  }

  get objectValue() {
    return {
      parentName: this.key,
      ...this.value
    };
  }

  get defaultObjectValueMapping() {
    return {};
  }

  get hasProperties() {
    return isObjectType(this.properties);
  }
}

module.exports = {
  toObject,
  MappingObject
};
