const {MappingBaseType} = require('./base')

const {buildMapping} = require('../')

function isObjectType(obj) {
  return obj === Object(obj);
}

function isObject(obj) {
  return obj.type === 'object' // && isObjectType(obj.properties)
}

function toObject(obj) {
  return isObject(obj) && MappingObject
    .create(obj)
    .convert()
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  get baseType() {
    return 'object'
  }

  constructor(obj) {
    super(obj)
    this.properties = this.value.properties
  }

  convert() {
    return this.properties
      ? buildMapping(this.value)
      : {}
  }
}

module.exports = {
  toObject,
  MappingObject
}
