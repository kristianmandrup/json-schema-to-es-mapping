const { build } = require("../..");
const { toGeoPoint } = require("./point");

const createLatLng = ({ lat, lng }) => ({
  type: "object",
  properties: {
    location: {
      type: "object",
      properties: {
        [lat]: {
          type: "number"
        },
        [lng]: {
          type: "number"
        }
      }
    }
  }
});

const create = opts => ({
  type: "string",
  ...opts
});

const createLoc = location => ({
  type: "object",
  properties: location
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return {
    key: opts.key || "location",
    type: value.type,
    value,
    schema,
    config
  };
};

const createPoint = opts => {
  const $opts = objFor(opts);
  console.log("createPoint", { opts, $opts });
  return toGeoPoint($opts);
};

module.exports = {
  build,
  createLatLng,
  createLoc,
  createPoint
};
