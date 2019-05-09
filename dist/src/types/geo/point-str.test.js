"use strict";
var _a = require("./helpers"), build = _a.build, createLoc = _a.createLoc, createPoint = _a.createPoint;
describe("geo_point", function () {
    describe("string prop", function () {
        var location = {
            type: "string"
        };
        var point = createPoint(location, "location");
        test("location is geo_point", function () {
            expect(point.type).toEqual("geo_point");
        });
    });
});
//# sourceMappingURL=point-str.test.js.map