"use strict";
var build = require("../..").build;
var create = function (_a) {
    var min = _a.min, max = _a.max;
    return ({
        type: "object",
        properties: {
            count: {
                type: "number",
                min: min,
                max: max
            }
        }
    });
};
describe("numeric range", function () {
    describe("integer", function () {
        describe("only max, no min", function () {
            json = create({ max: 1000 });
            var properties = build(json).properties;
            var count = (properties || {}).count;
            test("integer_range", function () {
                expect(count).toEqual({
                    type: "float"
                });
            });
        });
        describe("only min, no max", function () {
            json = create({ min: 1 });
            var properties = build(json).properties;
            var count = (properties || {}).count;
            test("integer_range", function () {
                expect(count).toEqual({
                    type: "float"
                });
            });
        });
        describe("min and max", function () { });
    });
    describe("long", function () {
        describe("only max, no min", function () { });
        describe("only min, no max", function () { });
        describe("min and max", function () { });
    });
    describe("float", function () {
        describe("only max, no min", function () { });
        describe("only min, no max", function () { });
        describe("min and max", function () { });
    });
    describe("double", function () {
        describe("only max, no min", function () { });
        describe("only min, no max", function () { });
        describe("min and max", function () { });
    });
});
//# sourceMappingURL=num_range.test.js.map