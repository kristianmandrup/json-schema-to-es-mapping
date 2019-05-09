"use strict";
var _a = require("./helpers"), createLatLng = _a.createLatLng, createPoint = _a.createPoint;
// const { toGeoPoint } = require("./point");
describe("geo location type", function () {
    describe("lat and lng props", function () {
        var location = createLatLng({ lat: "lat", lng: "lng" });
        var point = createPoint(location, "location");
        test("location is geo_point", function () {
            expect(point.type).toEqual("geo_point");
        });
    });
    describe("latitude and longitude props", function () {
        var location = createLatLng({ lat: "latitude", lng: "longitude" });
        var point = createPoint(location, "location");
        test("location is geo_point", function () {
            expect(point.type).toEqual("geo_point");
        });
    });
});
//# sourceMappingURL=point-lat-lng.test.js.map