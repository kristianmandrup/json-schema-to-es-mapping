const { MappingObject } = require("./object");
const { isNestedObject } = require("./util");

function toNestedObject(obj) {
  return isNestedObject(obj) && MappingObject.create(obj).convert();
}

// optionally: include_in_parent: true
class MappingNestedObject extends MappingObject {
  get baseType() {
    return "nested";
  }
}

module.exports = {
  toNestedObject,
  MappingNestedObject
};
