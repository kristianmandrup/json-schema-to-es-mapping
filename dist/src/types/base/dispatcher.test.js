"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var createDispatcher = require("./dispatcher").createDispatcher;
var $opts = {
    key: "name",
    value: {
        type: "string"
    },
    parentName: "person",
    resultKeyName: "name"
};
var create = function (done, expectation) {
    var config = {
        onResult: function (result) {
            expectation(result);
            done();
        }
    };
    return createDispatcher($opts, config);
};
var result = {
    done: true
};
var lookupObj = {
    key: "name",
    parentName: "person",
    resultKey: "name",
    schemaValue: { type: "string" }
};
var expected = __assign({ done: true }, lookupObj);
describe("dispatcher", function () {
    var dispatcher = create();
    describe("lookupObj", function () {
        test("object", function () {
            expect(dispatcher.lookupObj).toEqual(lookupObj);
        });
    });
    describe("dispatchObjFor", function () {
        test("object", function () {
            expect(dispatcher.dispatchObjFor(result)).toEqual(expected);
        });
    });
    describe("dispatch", function () {
        test("dispatches", function (done) {
            var expectation = function (res) { return expect(res).toEqual(expected); };
            var dispatcher = create(done, expectation);
            dispatcher.dispatch(result);
        });
    });
});
//# sourceMappingURL=dispatcher.test.js.map