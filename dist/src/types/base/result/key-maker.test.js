"use strict";
var createKeyMaker = require("./key-maker").createKeyMaker;
var create = createKeyMaker;
describe("ResultHandler", function () {
    describe("no parent name", function () {
        var maker = create({ key: "x" });
        describe("calcNestedKey", function () {
            test("default calc of nested key", function () {
                expect(maker.calcNestedKey()).toEqual("x");
            });
        });
        describe("nestedKey", function () {
            test("default calc of nested key", function () {
                expect(maker.nestedKey).toEqual("x");
            });
        });
    });
    describe("with parent name", function () {
        var maker = create({ key: "x", parentName: "par" });
        describe("calcNestedKey", function () {
            test("default calc of nested key", function () {
                expect(maker.calcNestedKey()).toEqual("par_x");
            });
        });
        describe("nestedKey", function () {
            test("default calc of nested key", function () {
                expect(maker.nestedKey).toEqual("par_x");
            });
        });
        describe("custom name separator", function () {
            var maker = create({ key: "x", parentName: "par" }, { nameSeparator: "-" });
            describe("nestedKey", function () {
                test("default calc of nested key", function () {
                    expect(maker.nestedKey).toEqual("par-x");
                });
            });
        });
    });
});
//# sourceMappingURL=key-maker.test.js.map