"use strict";
var build = require("../../").build;
var _a = require("./samples"), schema_string = _a.schema_string, schema_integer = _a.schema_integer, schema_number = _a.schema_number, schema_object = _a.schema_object, a = _a.a, b = _a.b, c = _a.c, d = _a.d, e = _a.e, f = _a.f, g = _a.g;
var JsToEs = build;
test("string", function () {
    var properties = JsToEs(schema_string).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "text",
            fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
    });
});
test("integer", function () {
    var properties = JsToEs(schema_integer).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "integer"
        }
    });
});
test("number", function () {
    var properties = JsToEs(schema_number).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "float"
        }
    });
});
test("object", function () {
    var properties = JsToEs(schema_object).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            properties: {
                prop1: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                },
                prop2: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                }
            },
            type: "nested"
        }
    });
});
test("array_str", function () {
    var properties = JsToEs(a).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "text",
            fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
    });
});
test("list_to_str", function () {
    var properties = JsToEs(b).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "text",
            fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
    });
});
test("list_to_float", function () {
    var properties = JsToEs(c).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "float"
        }
    });
});
test("list_to_int", function () {
    var properties = JsToEs(d).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "integer"
        }
    });
});
test("anyof_str_obj", function () {
    var properties = JsToEs(e).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "nested",
            properties: {
                object_from_string: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                },
                prop1: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                },
                prop2: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                }
            }
        }
    });
});
test("anyof_num_obj", function () {
    var properties = JsToEs(f).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "nested",
            properties: {
                object_from_number: { type: "float" },
                prop1: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                },
                prop2: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                }
            }
        }
    });
});
test("anyof_int_obj", function () {
    var properties = JsToEs(g).properties;
    expect(properties).toEqual({
        MedlineCitation: {
            type: "nested",
            properties: {
                object_from_integer: { type: "integer" },
                prop1: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                },
                prop2: {
                    type: "text",
                    fields: { keyword: { type: "keyword", ignore_above: 256 } }
                }
            }
        }
    });
});
//# sourceMappingURL=samples.test.js.map