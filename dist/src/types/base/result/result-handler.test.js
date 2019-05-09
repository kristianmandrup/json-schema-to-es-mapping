"use strict";
var createResultHandler = require("./result-handler").createResultHandler;
var createTypeHandler = require("../type-handler").createTypeHandler;
var create = createResultHandler;
describe("ResultHandler", function () {
    var key = "x";
    var resultMap = {
        x: {
            name: "x"
        }
    };
    var config = {
        resultMap: resultMap
    };
    describe.skip("create", function () {
        describe("missing keyMaker", function () {
            var typeHandler = {};
            test("throws", function () {
                expect(function () { return create({ key: key, typeHandler: typeHandler }, config); }).toThrow();
            });
        });
        describe("missing keyMaker", function () {
            var keyMaker = {};
            test("throws", function () {
                expect(function () { return create({ key: key, keyMaker: keyMaker }, config); }).toThrow();
            });
        });
    });
    describe("valid handler", function () {
        // const keyMaker = {};
        // const typeHandler = {};
        var config = {
            resultMap: resultMap
            // keyMaker,
            // typeHandler
        };
        var handler = create({ key: key }, config);
        describe("resultKeyName", function () {
            var keyName = key;
            test("is key name", function () {
                expect(handler.resultKeyName).toEqual(keyName);
            });
        });
        describe("calcResultKey", function () {
            var madeKey = key;
            test("is key name", function () {
                expect(handler.calcResultKey()).toEqual(madeKey);
            });
        });
        describe("resultMap", function () {
            test("should be resultMap", function () {
                expect(handler.resultMap).toEqual(resultMap);
            });
        });
        describe("result", function () {
            var obj = {
                name: "x"
            };
            test("is expected obj", function () {
                expect(handler.result).toEqual(obj);
            });
        });
        describe("shouldSetResult", function () {
            test("is true", function () {
                expect(handler.shouldSetResult).toBeTruthy();
            });
        });
        describe("createAndStoreResult", function () {
            describe("Missing typeHandler", function () {
                test("throws", function () {
                    expect(function () { return handler.createAndStoreResult(); }).not.toThrow();
                    expect(handler.createAndStoreResult()).toEqual({ type: "keyword" });
                });
            });
            describe("typeHandler", function () {
                var typeName = "string";
                var entry = {};
                var type = "keyword";
                handler.typeHandler = createTypeHandler({ typeName: typeName, entry: entry, type: type });
                test("creates, stores and returns result", function () {
                    expect(function () { return handler.createAndStoreResult(); }).not.toThrow();
                    expect(handler.createAndStoreResult()).toEqual(handler.resolvedResult);
                });
            });
        });
    });
});
//# sourceMappingURL=result-handler.test.js.map