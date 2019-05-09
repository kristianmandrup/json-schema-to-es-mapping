"use strict";
var createReference = require("./definition-ref").createReference;
var reference = "#/definitions/car";
var schema = {
    definitions: {
        car: {
            type: "object",
            name: "superCar",
            properties: {}
        }
    }
};
var config = {};
var opts = { schema: schema };
var resolver = createReference(opts, config);
resolver.reference = reference;
describe("Reference", function () {
    describe("name", function () {
        var name = resolver.name;
        test("is superCar", function () {
            expect(name).toEqual("superCar");
        });
    });
    describe("typeName", function () {
        var typeName = resolver.typeName;
        test("is SuperCar", function () {
            expect(typeName).toEqual("SuperCar");
        });
    });
    describe("refName", function () {
        var refName = resolver.refName;
        test("is car", function () {
            expect(refName).toEqual("car");
        });
    });
    describe("refObject", function () {
        var refObject = resolver.refObject;
        test("is an object with name: superCar", function () {
            expect(typeof refObject).toEqual("object");
            expect(refObject.name).toEqual("superCar");
        });
    });
    describe("normalizedRef", function () {
        var normalizedRef = resolver.normalizedRef;
        test("is car", function () {
            expect(normalizedRef).toEqual("definitions/car");
        });
    });
    describe("dotPath", function () {
        var dotPath = resolver.dotPath;
        test("is car", function () {
            expect(dotPath).toEqual("definitions.car");
        });
    });
    describe("referencePathResolvedAndVisited", function () {
        var obj = {
            type: "string"
        };
        resolver.referencePathResolvedAndVisited(obj);
        test("obj is cached", function () {
            var referenceFromCache = resolver.referenceFromCache;
            expect(referenceFromCache).toEqual(obj);
        });
    });
    describe("referenceFromCache", function () {
        describe("cache miss", function () {
            var referenceFromCache = resolver.referenceFromCache;
            test("no ref", function () {
                expect(referenceFromCache).toEqual("SuperCar");
            });
        });
        describe("cache hit", function () {
            resolver.reference = reference;
            resolver.visitedPaths[resolver.dotPath] = reference;
            var referenceFromCache = resolver.referenceFromCache;
            test("reference", function () {
                expect(referenceFromCache).toEqual(reference);
            });
        });
    });
});
//# sourceMappingURL=reference.test.js.map