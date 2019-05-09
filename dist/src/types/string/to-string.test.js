"use strict";
var _a = require("./string"), toString = _a.toString, MappingString = _a.MappingString;
var _b = require("./helpers"), string = _b.string, objFor = _b.objFor;
describe("MappingString", function () {
    describe("typeMap override: string -> text", function () {
        var config = {
            typeMap: {
                string: "text"
            }
        };
        var obj = objFor({ config: config });
        var mapper = string(obj);
        test("is text", function () {
            expect(mapper.config.typeMap.string).toEqual("text");
        });
    });
});
describe("typeMap", function () {
    describe("default", function () {
        var obj = objFor();
        var mapper = string(obj);
        test("is keyword", function () {
            expect(mapper.typeMap.string).toEqual("keyword");
        });
    });
    describe("typeMap override: string -> text", function () {
        var config = {
            typeMap: {
                string: "text"
            }
        };
        var obj = objFor({ config: config });
        var mapper = string(obj);
        test("is text", function () {
            expect(mapper.typeMap.string).toEqual("text");
        });
    });
});
describe("type", function () {
    describe("default", function () {
        var obj = objFor();
        var mapper = string(obj);
        test("is keyword", function () {
            expect(mapper.type).toEqual("keyword");
        });
    });
    describe("typeMap override: string -> text", function () {
        var config = {
            typeMap: {
                string: "text",
                x: "X"
            }
        };
        var obj = objFor({ config: config });
        var mapper = string(obj);
        test("is text", function () {
            expect(mapper.type).toEqual("text");
        });
    });
});
//# sourceMappingURL=to-string.test.js.map