"use strict";
var build = require("../..").build;
var create = function (_a) {
    var min = _a.min, max = _a.max;
    return ({
        type: "object",
        properties: {
            timestamp: {
                min: min,
                max: max
            }
        }
    });
};
describe("date range", function () {
    describe("only min, no max", function () {
        json = create({ min: "1-1-2014" });
        var properties = build(json).properties;
        test("date_range", function () {
            expec(properties.timestamp).toEqual({});
        });
    });
    describe("only max, no min", function () {
        json = create({ max: "1-1-2018" });
        var properties = build(json).properties;
        test("date_range", function () {
            expec(properties.timestamp).toEqual({});
        });
    });
    describe("min and max", function () {
        json = create({ min: "1-1-2014", max: "1-1-2018" });
        var properties = build(json).properties;
        test("date_range", function () {
            expec(properties.timestamp).toEqual({});
        });
    });
});
//# sourceMappingURL=date_range.test.js.map