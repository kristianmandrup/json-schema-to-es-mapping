const { MappingObject } = require("./object");
const { isReferenceObject } = require("./util");

function toReferenceObject(obj) {
  return isReferenceObject(obj) && MappingObject.create(obj).convert();
}

// TODO: use _parent: { type: "<name of type>"}, _source: { enabled: true}, _all: { enabled: false }
// optionally use
class MappingReferenceObject extends MappingObject {
  get baseType() {
    return "object";
  }
}

module.exports = {
  toReferenceObject,
  MappingReferenceObject
};
