"use strict";
var _a = require("./helpers"), create = _a.create, opts = _a.opts;
describe("create dispatcher", function () {
    describe("default", function () {
        describe("no init", function () {
            var mapper = create(opts);
            test("is undefined before init", function () {
                expect(mapper.dispatcher).toBeUndefined();
            });
        });
        describe("init", function () {
            describe("initDispatcher", function () {
                var mapper = create(opts);
                mapper.initDispatcher();
                test("is object", function () {
                    expect(typeof mapper.dispatcher).toEqual("object");
                });
            });
        });
        describe("passed in config", function () { });
    });
});
//# sourceMappingURL=dispatcher.test.js.map