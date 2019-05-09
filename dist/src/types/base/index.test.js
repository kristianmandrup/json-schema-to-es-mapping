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
var MappingBaseType = require("./index").MappingBaseType;
var create = function (opts, config) { return new MappingBaseType(opts, config); };
describe("MappingBaseType", function () {
    describe("constructor", function () {
        var key = "name";
        var value = {};
        var opts = { key: key, value: value };
        describe("config", function () {
            describe("default", function () {
                var mapper = create(opts);
                test("has default config with typeMap and fieldMap", function () {
                    expect(mapper.config.typeMap).toBeDefined();
                    expect(mapper.config.fieldMap).toBeDefined();
                });
            });
            describe("pass in opts", function () {
                var logOn = { logging: true };
                opts.config = logOn;
                var mapper = create(opts);
                test("merged with default config", function () {
                    expect(mapper.config.logging).toBe(true);
                });
            });
            describe("pass as 2nd arg", function () {
                var logOn = { logging: true };
                var mapper = create(opts, logOn);
                test("is empty object", function () {
                    expect(mapper.config.logging).toBe(true);
                });
            });
        });
        describe("opts", function () {
            describe("no opts passed", function () {
                var mapper = create();
                test("throws", function () {
                    expect(function () { return mapper.validateInit(); }).toThrow();
                });
            });
            describe("empty opts passed", function () {
                var mapper = create({});
                test("throws", function () {
                    expect(function () { return mapper.validateInit(); }).toThrow();
                });
            });
            describe.only("only key and value passed", function () {
                var mapper = create(opts);
                test("throws", function () {
                    expect(function () { return mapper.validateInit(); }).toThrow();
                });
            });
        });
        describe("schema", function () {
            var schema = {};
            describe("no schema passed", function () {
                var mapper = create(__assign({}, opts));
                test("throws", function () {
                    expect(function () { return mapper.validateInit(); }).toThrow();
                });
            });
            describe("schema passed in opts", function () {
                var mapper = create(__assign({}, opts, { schema: schema }));
                test("no throw", function () {
                    expect(function () { return mapper.validateInit(); }).not.toThrow();
                });
            });
            describe("schema passed in opts.config", function () {
                opts.config = { schema: schema };
                var mapper = create(opts);
                test("no throw", function () {
                    expect(function () { return mapper.validateInit(); }).not.toThrow();
                });
            });
        });
        describe("key", function () {
            describe("key: name passed", function () {
                var mapper = create(opts);
                test("throws", function () {
                    expect(mapper.key).toEqual(key);
                });
            });
        });
        describe("format", function () {
            describe("format: email passed in value", function () {
                var format = "email";
                opts.value.format = format;
                var mapper = create(opts);
                test("throws", function () {
                    expect(mapper.format).toEqual(format);
                });
            });
        });
        describe("result", function () {
            describe("default", function () {
                var mapper = create(opts);
                test("sets result to empty object", function () {
                    expect(mapper.result).toEqual({});
                });
            });
            describe("result passed", function () {
                var name = {
                    type: "string"
                };
                var result = [
                    {
                        name: name
                    }
                ];
                var mapper = create(opts, { result: result });
                test("sets result", function () {
                    expect(mapper.result).toEqual(result);
                });
            });
        });
        describe("visitedPaths", function () {
            describe("default", function () {
                var mapper = create(opts);
                test("sets visitedPaths to empty object", function () {
                    expect(mapper.visitedPaths).toEqual({});
                });
            });
            describe("visitedPaths passed in config", function () {
                var visitedPaths = {
                    x: true
                };
                var mapper = create(opts, { visitedPaths: visitedPaths });
                test("sets visitedPaths", function () {
                    expect(mapper.visitedPaths).toEqual(visitedPaths);
                });
            });
        });
        describe("value", function () {
            describe("value passed in opts", function () {
                var name = {
                    type: "string"
                };
                var value = {
                    name: name
                };
                opts.value = value;
                var mapper = create(opts);
                test("sets value", function () {
                    expect(mapper.value).toEqual(value);
                });
            });
        });
        describe("nested", function () {
            describe("default", function () {
                var mapper = create(opts);
                test("sets nested to false", function () {
                    expect(mapper.nested).toBeFalsy();
                });
            });
            describe("nested passed in opts", function () {
                var nested = true;
                var config = {
                    nested: nested
                };
                var mapper = create(opts, config);
                test("sets value", function () {
                    expect(mapper.nested).toEqual(nested);
                });
            });
        });
        describe("nestingLv", function () {
            describe("default", function () {
                var mapper = create(opts);
                test("sets nestingLv to 0", function () {
                    expect(mapper.nestingLv).toBe(0);
                });
            });
            describe("nestingLv passed in opts", function () {
                var nestingLv = 2;
                var config = {
                    nestingLv: nestingLv
                };
                var mapper = create(opts, config);
                test("sets nestingLv to passed", function () {
                    expect(mapper.nestingLv).toEqual(nestingLv);
                });
            });
        });
    });
    describe("validateSchema", function () {
        describe("schema passed", function () {
            test("throws", function () {
                opts.schema = {};
                var mapper = create(opts);
                expect(function () { return mapper.validateSchema(); }).not.toThrow();
            });
        });
        describe("no schema passed", function () {
            test("throws", function () {
                var mapper = create();
                expect(function () { return mapper.validateSchema(); }).toThrow();
            });
        });
    });
    describe("init", function () {
        var mapper = create();
        mapper.init();
        test("sets composer", function () {
            expect(mapper.composer).toBeDefined();
        });
        test("sets typeHandler", function () {
            expect(mapper.typeHandler).toBeDefined();
        });
        test("sets resultHandler", function () {
            expect(mapper.resultHandler).toBeDefined();
        });
        // TODO: more...
    });
    describe("resolveValue", function () {
        var mapper = create();
        describe("no init", function () {
            test("throws", function () {
                expect(function () { return mapper.resolve(); }).toThrow();
            });
        });
        describe("init", function () {
            mapper.init();
            test("resolves", function () {
                var resolved = mapper.resolve();
                expect(resolved).toBeDefined();
            });
        });
    });
    describe("calculatedType", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test("resolves", function () {
                var type = mapper.calculatedType;
                expect(type).toBeDefined();
            });
        });
    });
    describe("type", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test("resolves", function () {
                var calcType = mapper.calculatedType;
                var type = mapper.type;
                var baseType = mapper.baseType;
                console.log({ calcType: calcType, type: type, baseType: baseType });
                expect(type).toBeDefined();
            });
        });
    });
    describe("typeMap", function () {
        var mapper = create();
        test("resolves", function () {
            var typeMap = mapper.typeMap;
            expect(typeMap).toBeDefined();
        });
    });
    describe("typeName", function () {
        var mapper = create();
        test("throws - needs override by subclass", function () {
            expect(function () { return mapper.typeName; }).toThrow();
        });
    });
    describe("dispatch", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test.skip("dispatch", function (done) {
                // TODO: setup dispatc callback with done and expectation
                // mapper.
                // expect(res).toBeDefined();
                mapper.dispatch();
            });
        });
    });
    describe("convert", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test("converts", function () {
                var mapping = mapper.convert();
                expect(mapping).toBeDefined();
            });
        });
    });
    describe("createMappingResult", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test("creates mapping result", function () {
                var mapping = mapper.createMappingResult();
                expect(mapping).toBeDefined();
            });
        });
    });
    describe("createAndStoreResult", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test("creates mapping result", function () {
                var res = mapper.createAndStoreResult();
                var result = mapper.result;
                expect(res).toEqual(result);
            });
        });
    });
    describe("resolvedResult", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            test("undefined", function () {
                var result = mapper.resolvedResult;
                expect(result).toBeUndefined();
            });
        });
    });
    describe("resolve", function () {
        var mapper = create();
        describe("init", function () {
            mapper.init();
            describe("empty cache", function () {
                test("undefined", function () {
                    var resolved = mapper.resolve();
                    var wasCacheHit = mapper.wasCacheHit;
                    expect(resolved).toBeDefined();
                    expect(wasCacheHit).toBeFalsy();
                });
            });
            describe.skip("cache with no hit", function () {
                mapper.init();
                // TODO: setup cache with non-matching entry
                var resolved = mapper.resolve();
                var wasCacheHit = mapper.wasCacheHit;
                expect(resolved).toBeDefined();
                expect(wasCacheHit).toBeFalsy();
            });
            describe.skip("cache with hit", function () {
                mapper.init();
                // TODO: setup cache with matching entry
                var resolved = mapper.resolve();
                var wasCacheHit = mapper.wasCacheHit;
                expect(resolved).toBeDefined();
                expect(wasCacheHit).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map