"use strict";
var _a = require("./helpers"), create = _a.create, opts = _a.opts;
describe("create resultHandler", function () {
    describe("default", function () {
        describe("no init", function () {
            var mapper = create(opts);
            test("is undefined before init", function () {
                expect(mapper.resultHandler).toBeUndefined();
            });
        });
        describe("init", function () {
            describe("initResultHandler", function () {
                describe("no keyMaker", function () {
                    mapper.initEntryObj();
                    mapper.initTypeHandler();
                    test("throws", function () {
                        expect(function () { return mapper.initResultHandler(); }).toThrow();
                    });
                });
                describe("no typeHandler", function () {
                    mapper.initKeyMaker();
                    mapper.initEntryObj();
                    test("throws", function () {
                        expect(function () { return mapper.initResultHandler(); }).toThrow();
                    });
                });
                describe("no entry", function () {
                    mapper.initKeyMaker();
                    mapper.initTypeHandler();
                    test("throws", function () {
                        expect(mapper.initResultHandler()).toThrow();
                    });
                });
                describe("initialized", function () {
                    mapper.initKeyMaker();
                    mapper.initTypeHandler();
                    mapper.initEntryObj();
                    mapper.initResultHandler();
                    test("is function", function () {
                        expect(typeof mapper.resultHandler).toEqual("function");
                    });
                });
            });
        });
        describe("passed in config", function () { });
    });
});
//# sourceMappingURL=result-handler.test.js.map