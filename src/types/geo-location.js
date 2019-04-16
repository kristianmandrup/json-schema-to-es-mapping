const { MappingBase } = require("./base");

const short = (props) =>
  props.lat && (props.lng || props.long)

const full = (props) =>
  props.latitude && props.longitude

const isGeoLocation = (obj = {}) => {
  const { properties } = obj
  if (!properties) return false
  return short(properties) || full(properties)  
}

function toGeoLocation(obj) {
  return isGeoLocation(obj) && MappingGeoLocation.create(obj).convert();
}

// integer_range, float_range, long_range, double_range

class MappingGeoLocation extends MappingBase {
  get baseType() {
    return "geo";
  }
}

module.exports = {
  toGeoLocation,
  MappingGeoLocation
};
