"use strict";
var build = require("../..").build;
var create = function () { return ({
    type: "object",
    properties: {
        done: {
            type: "boolean"
        }
    }
}); };
describe("boolean", function () {
    describe("only min, no max", function () {
        json = create();
        var properties = build(json).properties;
        test("done", function () {
            expec(properties.done).toEqual({
                type: "boolean"
            });
        });
    });
});
//# sourceMappingURL=boolean.test.js.map