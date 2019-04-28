const { MappingBaseType } = require("../base");
const { isStringType, isString, isNumber } = require("../util");

const short = props =>
  props.lat &&
  isNumber(props.lat.type) &&
  props.lng &&
  isNumber(props.lng.type);

const full = props =>
  props.latitude &&
  isNumber(props.latitude.type) &&
  props.longitude &&
  isNumber(props.longitude.type);

const hasNumericItem = (items, index) => isNumber((items[index] || {}).type);

const isPointArray = obj => {
  if (!obj) return false;
  if (obj.type !== "array") return false;
  let { items } = obj;
  return Array.isArray(items)
    ? isPointArrayItems(items)
    : isPointArrayItem(obj, items);
};

const isPointArrayItems = (items = []) => {
  return hasNumericItem(items, 0) && hasNumericItem(items, 1);
};

const isPointArrayItem = (obj = {}, items = {}) => {
  return isNumber(items.type) && obj.minItems == 2 && obj.maxItems == 2;
};

const isPointType = (obj = {}) => isString(obj.type) || isPointArray(obj);

const isLocationKey = key => key.match(/location/);

const isLocationKeyAndObj = (key, obj) =>
  isLocationKey(key) && isPointType(obj);

// See: https://www.elastic.co/guide/en/elasticsearch/guide/current/lat-lon-formats.html
const isGeoPoint = (obj = {}, key) => {
  const isValidLocationKey = isStringType(key) && isLocationKeyAndObj(key, obj);
  console.log({ isValidLocationKey });
  if (isValidLocationKey) return true;
  const { properties } = obj;
  if (!properties) return false;
  return short(properties) || full(properties);
};

function toGeoPoint(obj) {
  const typeMatch = isGeoPoint(obj);
  console.log("toGeoPoint", typeMatch, obj);
  return typeMatch && MappingGeoPoint.create(obj).convert();
}

// integer_range, float_range, long_range, double_range

class MappingGeoPoint extends MappingBaseType {
  get baseType() {
    return "geo_point";
  }

  get typeName() {
    return "geo_point";
  }

  static create(obj) {
    return new MappingGeoPoint(obj).init();
  }
}

module.exports = {
  isGeoPoint,
  isPointType,
  isPointArray,
  isPointArrayItem,
  isPointArrayItems,
  hasNumericItem,
  short,
  full,
  isLocationKey,
  isLocationKeyAndObj,
  toGeoPoint,
  MappingGeoPoint
};
