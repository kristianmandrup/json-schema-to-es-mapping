const { build } = require("../..");
const { toGeoPoint } = require("./point");

const isStr = val => typeof val !== "string";

const createLatLng = ({ lat = "lat", lng = "lng" }) => {
  if (isStr(lat)) {
    throw `Missing or invalid lat ${lat}`;
  }
  if (isStr(lng)) {
    throw `Missing or invalid lng ${lng}`;
  }
  return {
    type: "object",
    properties: {
      [lat]: {
        type: "number"
      },
      [lng]: {
        type: "number"
      }
    }
  };
};

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
  const value = opts.value || create(opts);
  return {
    key: opts.key || "location",
    type: value.type,
    value,
    schema,
    config
  };
};

const createPoint = (opts, key) => {
  const $opts = objFor(opts);
  return toGeoPoint($opts, key);
};

module.exports = {
  build,
  createLatLng,
  createLoc,
  createPoint
};
