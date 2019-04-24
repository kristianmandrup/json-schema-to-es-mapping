const { MappingBaseType } = require("./base");
const { isFunction, isObject, isObjectType } = require("./util");

function toObject(obj) {
  return isObject(obj) && MappingObject.create(obj).convert();
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  get baseType() {
    return "object";
  }

  get typeName() {
    return "object";
  }

  constructor(obj) {
    super(obj);
    this.properties = this.value.properties;
    this.typeNameFor = this.config.typeNameFor;
    this.typeName = this.value.typeName || this.value.className;
  }

  static create(obj) {
    return new MappingObject(obj);
  }

  createMappingResult() {
    return this.shouldBuildValueMapping
      ? this.buildObjectValueMapping()
      : this.defaultObjectValueMapping;
  }

  get shouldBuildValueMapping() {
    return this.hasProperties && !this.wasCacheHit;
  }

  createResult() {
    const mapping = this.createMappingResult();
    const props = mapping.properties;
    return Object.keys(props).reduce((acc, key) => {
      if (key === "_type_") return acc;
      acc[key] = props[key];
      return acc;
    }, {});
  }

  buildObjectValueMapping() {
    const { buildProperties } = this.config;
    return buildProperties(this.objectValue, this.mappingConfig);
  }

  get incNestingLevel() {
    let nestingLevel = this.config.nestingLevel || 0;
    return nestingLevel++;
  }

  get mappingConfig() {
    return {
      result: this.result,
      name: this.key,
      nestingLv: this.incNestingLevel,
      nested: true,
      ...this.config
    };
  }

  get resolvedTypeName() {
    return this.typeName || this.resolveConfigTypeName(this.key);
  }

  resolveConfigTypeName(name) {
    return isFunction(this.typeNameFor) && this.typeNameFor(name);
  }

  get objectValue() {
    return {
      wasCacheHit: this.wasCacheHit,
      parentName: this.key,
      typeName: this.resolvedTypeName,
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
  isObject,
  toObject,
  MappingObject
};
