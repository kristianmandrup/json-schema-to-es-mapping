"use strict";
var build = require("./build").build;
describe("build", function () {
    var schema = {
        title: "person",
        type: "object",
        properties: {
            name: {
                type: "string"
            }
        }
    };
    describe("properties", function () {
        var built = build(schema, { schema: schema });
        var properties = built.properties;
        test("name: keyword", function () {
            expect(properties).toEqual({
                name: {
                    type: "keyword"
                }
            });
        });
    });
    describe("onComplete", function () {
        test("received", function (done) {
            onComplete = function (res) {
                expect(res).toEqual({});
                done();
            };
            var built = build(schema, { schema: schema, onComplete: onComplete });
        });
    });
    describe("onThrow", function () {
        test("throws", function (done) {
            var schema = {
                title: "person",
                type: "unknown"
            };
            onThrow = function (err) {
                console.log({ err: err });
                expect(err).toBeDefined();
                done();
            };
            expect(function () { return build(schema, { schema: schema, onThrow: onThrow }); }).toThrow();
        });
    });
});
//# sourceMappingURL=build.test.js.map