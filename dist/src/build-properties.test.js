"use strict";
var buildProperties = require("./build-properties").buildProperties;
describe("buildProperties", function () {
    describe("empty properties", function () {
        var schema = {
            title: "person",
            type: "object",
            properties: {}
        };
        var config = {};
        var built = buildProperties(schema, config);
        test("empty mapping", function () {
            expect(built).toBe({});
        });
    });
    describe("one name: string property", function () {
        var schema = {
            title: "person",
            type: "object",
            properties: {
                name: {
                    type: "string"
                }
            }
        };
        var config = {};
        var built = buildProperties(schema, config);
        test("ES string mapping", function () {
            expect(built).toBe({
                name: {
                    type: "string"
                }
            });
        });
    });
});
//# sourceMappingURL=build-properties.test.js.map