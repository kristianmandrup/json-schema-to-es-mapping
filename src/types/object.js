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

  createMappingResult() {
    return this.hasProperties
      ? this.buildObjectValueMapping()
      : this.defaultObjectValueMapping;
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
    const { buildMapping } = this.config;
    return buildMapping(this.objectValue, this.mappingConfig);
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
