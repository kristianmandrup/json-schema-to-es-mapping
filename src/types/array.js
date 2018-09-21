const {MappingBaseType} = require('./base')

function isBoolean(type) {
  return type === 'array'
}

function toArray(obj) {
  return isArray(obj.type) && MappingArray
    .create(obj)
    .convert()
}

class MappingArray extends MappingBaseType {
  get baseType() {
    return 'nested'
  }

  static create(obj) {
    return new MappingArray(obj)
  }
}

module.exports = {
  toArray,
  MappingArray
}
