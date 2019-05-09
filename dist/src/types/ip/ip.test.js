"use strict";
var build = require("../..").build;
var create = function () { return ({
    type: "object",
    properties: {
        ip: {
            type: "string",
            format: "ip"
        }
    }
}); };
describe("ip type", function () {
    describe("string: ip format", function () {
        json = create();
        var properties = build(json).properties;
        test("ip", function () {
            expect(properties.ip.type).toEqual("ip");
        });
    });
});
//# sourceMappingURL=ip.test.js.map