// TODO: check if has any date format
function hasDateContraint(obj) {
  return false;
}

function isFunction(fun) {
  return typeof fun === "function";
}

function hasDateType(type) {
  return ["date", "date-time", "time"].find(t => t === type);
}

function isDate(obj) {
  return (
    (obj.type === "string" && hasDateContraint(obj)) || hasDateType(obj.type)
  );
}

function isInteger(type) {
  return type === "integer";
}

function isNumber(type) {
  return type === "number" || isInteger(type);
}

function isObjectType(obj) {
  return obj === Object(obj);
}

function isObject(obj) {
  return obj.type === "object" || obj === "object"; // && isObjectType(obj.properties)
}

function isBoolean(type) {
  return type === "boolean";
}

module.exports = {
  isObject,
  isObjectType,
  isDate,
  isNumber,
  isInteger,
  isBoolean,
  isFunction
};
