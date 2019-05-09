"use strict";
var createSchemaEntry = require("./entry").createSchemaEntry;
describe("SchemaEntry", function () {
    var schema = {};
    var opts = {
        key: "name",
        value: {
            type: "string"
        }
    };
    var entry = createSchemaEntry(opts);
    describe("config", function () {
        describe("no config passed", function () {
            test("uses default config", function () {
                expect(entry.config).toEqual({});
            });
        });
    });
    describe("with config that has schema", function () {
        var config = {
            logging: true,
            schema: schema
        };
        describe("isValidSchema", function () {
            describe("invalid schema", function () {
                var opts = {
                    key: "name",
                    value: {}
                };
                var entry = createSchemaEntry(opts, config);
                test("is invalid (false)", function () {
                    expect(entry.isValidSchema).toBeFalsy();
                });
            });
            describe("valid schema", function () {
                var opts = {
                    key: "name",
                    value: {
                        type: "string"
                    }
                };
                var entry = createSchemaEntry(opts, config);
                test("is valid (true)", function () {
                    expect(entry.isValidSchema).toBeTruthy();
                });
            });
        });
        describe("typeObjMapperFor", function () {
            test("is a function", function () {
                expect(typeof entry.typeObjMapperFor).toEqual("function");
            });
            describe("pass via config", function () {
                var typeObjMapperFor = function () { return "x"; };
                var config = {
                    typeObjMapperFor: typeObjMapperFor
                };
                var entry = createSchemaEntry(opts, config);
                test("is a function", function () {
                    expect(entry.typeObjMapperFor).toBe(typeObjMapperFor);
                });
            });
        });
        describe("toEntryStringType", function () {
            describe("type is a string: number", function () {
                var opts = {
                    key: "name",
                    value: {
                        type: "number"
                    }
                };
                var entry = createSchemaEntry(opts, config);
                test("ElasticSearch mapping", function () {
                    expect(entry.toEntryStringType()).toEqual({
                        type: "number"
                    });
                });
            });
            describe("type is an object: anyOf", function () {
                var opts = {
                    key: "name",
                    value: {
                        type: {
                            anyOf: [{ type: "number" }]
                        }
                    }
                };
                var entry = createSchemaEntry(opts, config);
                test("throws", function () {
                    expect(function () { return entry.toEntryStringType(); }).toThrow();
                });
            });
        });
        describe("obj", function () {
            describe("type: number, key: age, parent: person", function () {
                var type = "number";
                var value = {
                    type: type
                };
                var key = "name";
                var parentName = "person";
                var opts = {
                    key: key,
                    value: value,
                    parentName: parentName
                };
                var entry = createSchemaEntry(opts, config);
                test("as expected", function () {
                    expect(entry.obj).toEqual({
                        parentName: parentName,
                        key: key,
                        value: value,
                        type: type,
                        config: config
                    });
                });
            });
        });
        describe("typeOrder", function () {
            describe("default", function () {
                var order = [
                    "ip",
                    "point",
                    "string",
                    "dateRange",
                    "numericRange",
                    "number",
                    "boolean",
                    "array",
                    "object",
                    "date"
                ];
                test("is expected order", function () {
                    expect(entry.typeOrder).toEqual(order);
                });
            });
            describe("passed", function () {
                var opts = {
                    key: "name",
                    value: {}
                };
                var typeOrder = ["ip", "string"];
                var config = {
                    typeOrder: typeOrder
                };
                var entry = createSchemaEntry(opts, config);
                test("as passed", function () {
                    expect(entry.typeOrder).toEqual(typeOrder);
                });
                describe("use order on string entry", function () {
                    var opts = {
                        key: "ip",
                        value: {}
                    };
                    var entry = createSchemaEntry(opts, config);
                    var result = entry.toEntryStringType();
                    test("type: ip", function () {
                        expect(result).toEqual({
                            type: "ip"
                        });
                    });
                });
            });
        });
        describe("typeMapperFor", function () {
            describe("number", function () {
                var opts = {
                    key: "name",
                    value: {
                        type: "number"
                    }
                };
                var entry = createSchemaEntry(opts, config);
                test("is a function", function () {
                    expect(typeof entry.typeMapperFor("number")).toEqual("function");
                });
            });
            describe("unknown", function () {
                test("undefined", function () {
                    expect(entry.typeMapperFor("unknown")).toBeUndefined();
                });
            });
        });
        describe("toEntryObjType", function () {
            describe("type is a string: number", function () {
                var type = "number";
                var opts = {
                    key: "name",
                    value: {
                        type: type
                    }
                };
                var entry = createSchemaEntry(opts, config);
                test("throws", function () {
                    var fn = function () { return entry.toEntryObjType(); };
                    expect(fn).toThrow();
                });
            });
            describe("type is an object: anyOf", function () {
                var type = {
                    anyOf: [{ type: "number" }]
                };
                var opts = {
                    key: "name",
                    value: {
                        type: type
                    }
                };
                var entry = createSchemaEntry(opts, config);
                test("ES mapping", function () {
                    expect(function () { return entry.toEntryObjType(); }).toThrow();
                    // TODO:
                    // expect(entry.toEntryObjType()).toEqual({
                    //   type: "keyword"
                    // });
                });
            });
            describe("toEntry", function () {
                test("type is a string: number", function () {
                    expect(entry.toEntry()).toEqual({
                        type: "integer"
                    });
                });
                test("type is an object: anyOf", function () {
                    expect(entry.toEntry()).toEqual({
                        type: "keyword"
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=entry.test.js.map