const { MappingBase } = require("./base");

const isGeoLocation = (obj) => false

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
