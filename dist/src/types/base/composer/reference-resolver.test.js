"use strict";
var _a = require("./helpers"), create = _a.create, opts = _a.opts;
describe("create referenceResolver", function () {
    describe("default", function () {
        var c = create(opts);
        test("is undefined before init", function () {
            expect(c.referenceResolver).toBeUndefined();
        });
        describe("initReferenceResolver", function () {
            var composer = create(opts);
            describe("initialized", function () {
                composer.initResultHandler();
                test("is function", function () {
                    expect(typeof composer.referenceResolver).toEqual("function");
                });
            });
        });
    });
    describe("passed in config", function () {
        var createReferenceResolver = function () { return ({
            resolved: "y"
        }); };
        var config = {
            createReferenceResolver: createReferenceResolver
        };
        var composer = create(opts, config);
        describe("initKeyMaker", function () {
            composer.initReferenceResolver();
            test("is object", function () {
                expect(typeof composer.referenceResolver).toEqual("object");
            });
            test("generates ?? as expected", function () {
                expect(composer.referenceResolver.resolved).toEqual("y");
            });
        });
    });
});
//# sourceMappingURL=reference-resolver.test.js.map