"use strict";
var createEntryObj = require("./entry").createEntryObj;
var create = function (opts, config) {
    if (config === void 0) { config = {}; }
    return createEntryObj(opts, config);
};
describe("entry", function () {
    var _a = ["name", "person_name"], key = _a[0], nestedKey = _a[1];
    var config = {};
    var opts = { key: key, nestedKey: nestedKey };
    var entryObj = create(opts, config);
    describe("create", function () {
        test("config", function () {
            expect(entryObj.config).toEqual(config);
        });
        test("key", function () {
            expect(entryObj.key).toBe(key);
        });
        test("nestedKey", function () {
            expect(entryObj.nestedKey).toBe(nestedKey);
        });
    });
    describe("lookedUpEntry", function () {
        describe("no entryFor", function () {
            test("void", function () {
                expect(entryObj.lookedUpEntry).toBeUndefined();
            });
        });
        describe("has entryFor", function () {
            var val = { name: "x" };
            var entryFor = function () { return val; };
            var config = {
                entryFor: entryFor
            };
            var entryObj = create(opts, config);
            test("sets entryFor", function () {
                expect(entryObj.entryFor).toBe(entryFor);
            });
            test("entry obj", function () {
                expect(entryObj.lookedUpEntry).toEqual(val);
            });
        });
    });
    describe("fields", function () {
        describe("no field map", function () {
            var config = {
                fieldMap: null
            };
            var entryObj = create(opts, config);
            test("void", function () {
                expect(entryObj.fields).toEqual({});
            });
        });
        describe("empty field map", function () {
            var config = {
                fieldMap: {}
            };
            var entryObj = create(opts, config);
            test("void", function () {
                expect(entryObj.fields).toEqual({});
            });
        });
        describe("has fieldMap", function () {
            var fieldMap = {
                name: {
                    type: "string"
                }
            };
            var config = {
                fieldMap: fieldMap
            };
            var entryObj = create(opts, config);
            test("is fieldMap", function () {
                expect(entryObj.fields).toBe(fieldMap);
            });
        });
    });
    describe("configFieldEntry", function () {
        describe("no match", function () {
            var config = {
                fieldMap: null
            };
            var entryObj = create(opts, config);
            test("void", function () {
                expect(entryObj.configFieldEntry).toBeUndefined();
            });
        });
        describe("map for key", function () {
            var entry = {
                type: "string"
            };
            var config = {
                fieldMap: {
                    name: entry
                }
            };
            var entryObj = create(opts, config);
            test("void", function () {
                expect(entryObj.configFieldEntry).toEqual(entry);
            });
        });
        describe("map for nestedKey", function () {
            var entry = {
                type: "keyword"
            };
            var fieldMap = {
                person_name: entry
            };
            var config = {
                fieldMap: fieldMap
            };
            var entryObj = create(opts, config);
            test("is fieldMap", function () {
                expect(entryObj.configFieldEntry).toEqual(entry);
            });
        });
    });
    describe("entry", function () { });
});
//# sourceMappingURL=entry.test.js.map