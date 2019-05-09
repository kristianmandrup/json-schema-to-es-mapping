"use strict";
var _a = require("./helpers"), create = _a.create, opts = _a.opts;
describe("create keyMaker", function () {
    describe("default", function () {
        var c = create(opts);
        test("is undefined before init", function () {
            expect(c.keyMaker).toBeUndefined();
        });
    });
    describe("initKeyMaker", function () {
        var composer = create(opts);
        composer.initKeyMaker();
        test("is object", function () {
            expect(typeof composer.keyMaker).toEqual("object");
        });
        test("generates key as expected", function () {
            expect(composer.keyMaker.key).toEqual("x");
        });
    });
    describe("passed in config", function () {
        var createKeyMaker = function () { return ({
            key: "y"
        }); };
        var config = {
            createKeyMaker: createKeyMaker
        };
        var composer = create(opts, config);
        describe("initKeyMaker", function () {
            composer.initKeyMaker();
            test("is object", function () {
                expect(typeof composer.keyMaker).toEqual("object");
            });
            test("generates key as expected", function () {
                expect(composer.keyMaker.key).toEqual("y");
            });
        });
    });
});
//# sourceMappingURL=key-maker.test.js.map