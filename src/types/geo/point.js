const { MappingBase } = require("../base");
const { isString } = require("../util");

const short = props => props.lat && (props.lng || props.long);

const full = props => props.latitude && props.longitude;

const hasNumericItem = (items, index) => items[index].type === "number";

const isPointArray = obj =>
  obj.type === "array" && hasNumericItem(items, 0) && hasNumericItem(items, 1);

const isPointType = obj => isPointArray(obj) || isString(obj.type);

const location = props => props.location && isPointType(props.location);

// See: https://www.elastic.co/guide/en/elasticsearch/guide/current/lat-lon-formats.html
const isGeoLocation = (obj = {}) => {
  const { properties } = obj;
  if (!properties) return false;
  return short(properties) || full(properties) || location(properties);
};

function toGeoLocation(obj) {
  return isGeoLocation(obj) && MappingGeoLocation.create(obj).convert();
}

// integer_range, float_range, long_range, double_range

class MappingGeoLocation extends MappingBase {
  get baseType() {
    return "geo_point";
  }
}

module.exports = {
  toGeoLocation,
  MappingGeoLocation
};
