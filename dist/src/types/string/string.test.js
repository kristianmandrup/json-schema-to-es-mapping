"use strict";
var build = require("../../..").build;
var create = function () { return ({
    type: "object",
    properties: {
        name: {
            type: "string"
        }
    }
}); };
var config = {};
describe("string", function () {
    describe("default", function () {
        json = create();
        var properties = build(json, config).properties;
        var name = (properties || {}).name;
        test("is keyword", function () {
            expect(name).toEqual({
                type: "keyword"
            });
        });
    });
    describe("typeMap: string: text", function () {
        var config = {
            typeMap: {
                string: "text"
            }
        };
        json = create();
        var properties = build(json, config).properties;
        var name = (properties || {}).name;
        test("is text", function () {
            expect(name).toEqual({
                type: "text"
            });
        });
    });
});
//# sourceMappingURL=string.test.js.map