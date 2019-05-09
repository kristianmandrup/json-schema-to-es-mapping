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
var _a = require("./helpers"), create = _a.create, opts = _a.opts;
var keysOf = function (obj) { return Object.keys(obj); };
var isEmptyObj = function (obj) { return !obj || keysOf(obj).length === 0; };
describe("create typeHandler", function () {
    describe("default", function () {
        describe("no init", function () {
            var composer = create(opts);
            test("is undefined before init", function () {
                expect(composer.typeHandler).toBeUndefined();
            });
        });
        describe("init", function () {
            var composer = create(opts);
            describe("invalid configuration", function () {
                test("throws", function () {
                    expect(function () { return composer.initTypeHandler(); }).toThrow();
                });
            });
            describe("initTypeHandler", function () {
                var $opts = __assign({}, opts, { type: "string" });
                var composer = create($opts);
                composer.initTypeHandler();
                var typeHandler = composer.typeHandler;
                test("is function", function () {
                    expect(typeof typeHandler).toEqual("object");
                });
                describe("typeHandler", function () {
                    describe("empty typeMap and entry", function () {
                        describe("typeMap", function () {
                            var typeMap = typeHandler.typeMap;
                            test("is object", function () {
                                expect(typeof typeMap).toEqual("object");
                            });
                            test("is empty", function () {
                                expect(isEmptyObj(typeMap)).toBeTruthy();
                            });
                        });
                        describe("entry", function () {
                            var entry = typeHandler.entry;
                            test("is object", function () {
                                expect(typeof entry).toEqual("object");
                            });
                            test("is empty", function () {
                                expect(isEmptyObj(entry)).toBeTruthy();
                            });
                        });
                        describe("entryType", function () {
                            test("is undefined", function () {
                                expect(typeHandler.entryType).toBeUndefined();
                            });
                        });
                        describe("type", function () {
                            test("is undefined", function () {
                                expect(typeHandler.type).toBeUndefined();
                            });
                        });
                    });
                    describe("empty typeMap and entry passed in opts", function () {
                        var entry = {
                            type: "string"
                        };
                        var $opts = __assign({}, opts, { entry: entry });
                        var composer = create($opts);
                        composer.initTypeHandler();
                        var typeHandler = composer.typeHandler;
                        describe("typeMap", function () {
                            var typeMap = typeHandler.typeMap;
                            test("is object", function () {
                                expect(typeof typeMap).toEqual("object");
                            });
                            test("is empty", function () {
                                expect(isEmptyObj(typeMap)).toBeTruthy();
                            });
                        });
                        describe("entry", function () {
                            var entry = typeHandler.entry;
                            test("is object", function () {
                                expect(typeof entry).toEqual("object");
                            });
                            test("is not empty", function () {
                                expect(isEmptyObj(entry)).toBeFalsy();
                            });
                        });
                        describe("entryType", function () {
                            test("is string", function () {
                                expect(typeHandler.entryType).toEqual("string");
                            });
                        });
                        describe("type", function () {
                            test("is string", function () {
                                expect(typeHandler.type).toEqual("string");
                            });
                        });
                    });
                    describe("empty typeMap and config with createEntryObj", function () {
                        var createEntryObj = function () { return ({
                            entry: {
                                type: "string"
                            }
                        }); };
                        var $opts = __assign({}, opts);
                        var config = { createEntryObj: createEntryObj };
                        var composer = create($opts, config);
                        composer.initTypeHandler();
                        var typeHandler = composer.typeHandler;
                        describe("typeMap", function () {
                            var typeMap = typeHandler.typeMap;
                            test("is object", function () {
                                expect(typeof typeMap).toEqual("object");
                            });
                            test("is empty", function () {
                                expect(isEmptyObj(typeMap)).toBeTruthy();
                            });
                        });
                        describe("entry", function () {
                            var entry = typeHandler.entry;
                            test("is object", function () {
                                expect(typeof entry).toEqual("object");
                            });
                            test("is not empty", function () {
                                expect(isEmptyObj(entry)).toBeFalsy();
                            });
                        });
                        describe("entryType", function () {
                            test("is string", function () {
                                expect(typeHandler.entryType).toEqual("string");
                            });
                        });
                        describe("type", function () {
                            test("is string", function () {
                                expect(typeHandler.type).toEqual("string");
                            });
                        });
                    });
                });
            });
        });
        describe("createTypeHandler passed in config", function () {
            var createTypeHandler = function () { return ({
                type: "string"
            }); };
            var config = {
                createTypeHandler: createTypeHandler
            };
            var composer = create(opts, config);
            describe("initKeyMaker", function () {
                composer.initTypeHandler();
                test("is object", function () {
                    expect(typeof composer.typeHandler).toEqual("object");
                });
                describe("type", function () {
                    test("is type of typeHandler created", function () {
                        expect(composer.typeHandler.type).toEqual("string");
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=type-handler.test.js.map