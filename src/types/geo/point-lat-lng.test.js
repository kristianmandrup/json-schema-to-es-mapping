const { build, create, createLoc } = require("./helpers");

describe("geo location type", () => {
  describe.only("lat and lng props", () => {
    json = create({ lat: "lat", lng: "lng" });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expect(properties.location.type).toEqual("geo_point");
    });
  });

  describe("latitude and longitude props", () => {
    json = create({ lat: "latitude", lng: "longitude" });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expect(properties.location.type).toEqual("geo_point");
    });
  });
});
