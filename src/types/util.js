// TODO: check if has any date format
function hasDateContraint(obj) {
  return false;
}

function isFunction(fun) {
  return typeof fun === "function";
}

function isDateFormat(type) {
  return ["date", "date-time", "time"].find(t => t === type);
}

function isDate(obj) {
  return isNumDate(obj) || isStrDate(obj);
}

function isNumDate(obj) {
  return isInteger(obj.type) && (obj.date === true || isDateFormat(obj.format));
}

function isStrDate(obj) {
  return (
    (obj.type === "string" && hasDateContraint(obj)) || isDateFormat(obj.format)
  );
}

function safeToFloat(num, defaultValue = 1) {
  try {
    return Number.parseFloat(num);
  } catch (err) {
    return defaultValue;
  }
}

function safeToInt(num, defaultValue = 1) {
  try {
    return Number.parseInt(num);
  } catch (err) {
    return defaultValue;
  }
}

function isInteger(type) {
  return type === "integer";
}

function isNumber(type) {
  return type === "number" || isInteger(type);
}

function isNumericRange(obj) {
  if (!obj.range === true) return false;
  const min = obj.minimum || obj.exclusiveMinimum;
  const max = obj.maximum || obj.exclusiveMaximum;
  return (
    isNumber(obj.type) && safeToFloat(min, false) && safeToFloat(max, false)
  );
}

function isDateRange(obj) {
  if (!obj.range === true) return false;
  const min = obj.minimum || obj.exclusiveMinimum;
  const max = obj.maximum || obj.exclusiveMaximum;
  return isDate(obj.type) && safeToFloat(min, false) && safeToFloat(max, false);
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
  isDateRange,
  isNumericRange,
  isNumber,
  isInteger,
  isBoolean,
  isFunction,
  safeToFloat,
  safeToInt
};
