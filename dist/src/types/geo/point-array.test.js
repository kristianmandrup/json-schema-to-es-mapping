"use strict";
var _a = require("./helpers"), build = _a.build, createLoc = _a.createLoc;
describe("geo_point", function () {
    describe("numeric array prop", function () {
        var location = {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
                type: "number"
            }
        };
        json = createLoc({ location: location });
        var properties = build(json).properties;
        test("location is geo_point", function () {
            expect(properties.location.type).toEqual("geo_point");
        });
    });
    describe("string array prop", function () {
        var location = {
            type: "array",
            minItems: 2,
            maxItems: 2,
            items: {
                type: "string"
            }
        };
        json = createLoc({ location: location });
        // console.log({ json });
        var properties = build(json).properties;
        test("location not geo_point", function () {
            expect(properties.location.type).not.toEqual("geo_point");
        });
    });
});
//# sourceMappingURL=point-array.test.js.map