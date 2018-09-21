const {MappingMixed, toMixed, ConvertMappingSchemaError} = require('./base')
const {MappingArray, toArray} = require('./array')
const {MappingBoolean, toBoolean} = require('./boolean')
const {MappingNumber, toNumber} = require('./number')
const {MappingObject, toObject} = require('./object')
const {MappingString, toString} = require('./string')

module.exports = {
  MappingArray,
  toArray,
  MappingBoolean,
  toBoolean,
  MappingNumber,
  toNumber,
  MappingObject,
  toObject,
  MappingString,
  toString,
  MappingMixed,
  toMixed,
  ConvertMappingSchemaError
}
