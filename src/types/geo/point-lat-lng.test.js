const { createLatLng, createPoint } = require("./helpers");
// const { toGeoPoint } = require("./point");

describe("geo location type", () => {
  describe("lat and lng props", () => {
    const location = createLatLng({ lat: "lat", lng: "lng" });
    const point = createPoint(location, "location");
    test("location is geo_point", () => {
      expect(point.type).toEqual("geo_point");
    });
  });

  describe("latitude and longitude props", () => {
    const location = createLatLng({ lat: "latitude", lng: "longitude" });
    const point = createPoint(location, "location");
    test("location is geo_point", () => {
      expect(point.type).toEqual("geo_point");
    });
  });
});
