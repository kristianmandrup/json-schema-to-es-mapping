"use strict";
var _a = require("./helpers"), create = _a.create, opts = _a.opts;
describe("create entryObj", function () {
    describe("default", function () {
        describe("no init", function () {
            var mapper = create(opts);
            test("is undefined before init", function () {
                expect(mapper.entryObj).toBeUndefined();
            });
        });
        describe("init", function () {
            describe("initEntryObj", function () {
                var mapper = create(opts);
                mapper.initEntryObj();
                test("is function", function () {
                    expect(typeof mapper.entryObj).toEqual("object");
                });
            });
        });
        describe("passed in config", function () { });
    });
});
//# sourceMappingURL=entry-obj.test.js.map