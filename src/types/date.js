const {MappingBaseType} = require('./base')

// TODO: check if has any date format
function hasDateContraint(obj) {
  return false
}

function hasDateType(type) {
  return ['date', 'date-time', 'time'].find(t => t === type)
}

function isDate(obj) {
  return (obj.type === 'string' && hasDateContraint(obj)) || hasDateType(obj.type)
}

function toDate(obj) {
  return isDate(obj) && MappingDate
    .create(obj)
    .convert()
}

class MappingDate extends MappingBaseType {
  get baseType() {
    return 'date'
  }

  static create(obj) {
    return new MappingDate(obj)
  }
}

module.exports = {
  toDate,
  MappingDate
}
