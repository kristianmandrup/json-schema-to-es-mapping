"use strict";
var isString = require("./string").isString;
var string = require("./helpers").string;
describe("isString", function () {
    test("type: undefined - false", function () {
        expect(isString()).toBeFalsy();
    });
    test("type: integer - true", function () {
        expect(isString("integer")).toBeFalsy();
    });
    test("type: string - true", function () {
        expect(isString("string")).toBeTruthy();
    });
});
describe("MappingString", function () {
    describe("config", function () {
        describe("default", function () {
            var obj = objFor();
            var mapper = string(obj);
            test("is keyword", function () {
                expect(mapper.config.typeMap.string).toEqual("keyword");
            });
        });
    });
});
//# sourceMappingURL=to-string-default.test.js.map