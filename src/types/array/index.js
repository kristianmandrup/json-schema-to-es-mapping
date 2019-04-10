const { MappingBaseType } = require("../base");
const { isObjectType } = require("../util");

function isArray(type) {
  return type === "array";
}

function toArray(obj) {
  return isArray(obj.type) && MappingArray.create(obj).convert();
}

class MappingArray extends MappingBaseType {
  get baseType() {
    return "nested";
  }

  get validItems() {
    return Array.isArray(this.items) || isObjectType(this.items);
  }

  get resolveFirstItem() {
    if (!this.validItems) return {};
    return Array.isArray(this.items) ? this.selectFirstItem : this.items;
  }

  get firstItem() {
    return this.items[0];
  }

  get selectFirstItem() {
    return this.hasValidItemTypes ? this.firstItem : this.invalidItemTypes();
  }

  invalidItemTypes() {
    this.error(
      `Invalid item types for ${
        this.key
      }. All array items must share the same type to be mappable to ElasticSearch`,
      {
        schema: this.schema,
        items: this.items
      }
    );
  }

  get hasValidItemTypes() {
    return this.hasSameItemTypes;
  }

  get hasSameItemTypes() {
    const type = this.firstItem.type;
    return this.items.every(item => item.type === type);
  }

  get items() {
    return this.value.items;
  }

  get arrayType() {
    return this.resolveFirstItem.type;
  }

  get resolvedArrayType() {
    return this.metaType(this.arrayType);
  }

  get type() {
    return this.configType || this.resolvedArrayType || this.baseType;
  }

  static create(obj) {
    return new MappingArray(obj);
  }
}

module.exports = {
  toArray,
  MappingArray
};
