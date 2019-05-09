"use strict";
var createTypeHandler = require("./type-handler").createTypeHandler;
var create = createTypeHandler;
var Project = {
    type: "object",
    properties: {
        title: {
            type: "string"
        }
    }
};
var schema = {
    definitions: {
        Project: Project
    }
};
describe("TypeHandler", function () {
    var config = {
        typeMap: {
            string: "keyword"
        }
    };
    var typeName = "string";
    var calcType = function () { return "text"; };
    var entry = {
        type: "string"
    };
    describe("default calcType function used", function () {
        describe("typeMap typeName used", function () {
            var handler = create({ typeName: typeName }, config);
            describe("type", function () {
                test("entry type string", function () {
                    expect(handler.type).toEqual("keyword");
                });
            });
        });
        describe("entry object passed", function () {
            var handler = create({ typeName: typeName, entry: entry }, config);
            describe("type", function () {
                test("entry type string", function () {
                    expect(handler.type).toEqual("string");
                });
            });
        });
    });
    describe("type value passed", function () {
        var type = "string";
        var handler = create({ typeName: typeName, entry: entry, type: type }, config);
        describe("type", function () {
            test("string", function () {
                expect(handler.type).toEqual("string");
            });
        });
    });
    describe("calcType function passed", function () {
        var handler = create({ typeName: typeName, entry: entry, calcType: calcType }, config);
        describe("typeMapValue", function () {
            test("string", function () {
                expect(handler.typeMapValue).toEqual("keyword");
            });
        });
        describe("calcType", function () {
            test("string", function () {
                expect(handler.calcType()).toEqual("text");
            });
        });
        describe("type", function () {
            test("string", function () {
                expect(handler.type).toEqual("string");
            });
        });
    });
});
//# sourceMappingURL=type-handler.test.js.map