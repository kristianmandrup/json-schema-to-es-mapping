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

  get firstItem() {
    if (!this.validItems) return {};
    return Array.isArray(this.items) ? this.items[0] : this.items;
  }

  get items() {
    return this.value.items;
  }

  get arrayType() {
    return this.firstItem.type;
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
