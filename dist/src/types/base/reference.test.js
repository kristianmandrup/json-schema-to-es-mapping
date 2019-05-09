"use strict";
var createReferenceResolver = require("./reference").createReferenceResolver;
var create = createReferenceResolver;
var Project = {
    type: "object",
    properties: {
        title: {
            type: "string"
        }
    }
};
var schema = {
    definitions: {
        Project: Project
    }
};
describe("ReferenceResolver", function () {
    var config = {};
    describe("no reference", function () {
        var opts = {
            schema: schema
        };
        var $reference = create(opts, config);
        var obj = {};
        test("resolves to obj", function () {
            expect($reference.resolve(obj)).toBe(obj);
        });
    });
    describe("no schema", function () {
        var reference = "#/definitions/Project";
        var opts = {
            reference: reference
        };
        var obj = {
            $ref: "#/definitions/Project"
        };
        test("throws", function () {
            expect(function () {
                var $reference = create(opts, config);
                $reference.resolve(obj);
            }).toThrow();
        });
    });
    describe("schema and valid reference", function () {
        var reference = "#/definitions/Project";
        var opts = {
            reference: reference,
            schema: schema
        };
        var $reference = create(opts, config);
        var resolved = Project;
        var obj = {
            $ref: "#/definitions/Project"
        };
        test("throws", function () {
            expect($reference.resolve(obj)).toEqual(resolved);
        });
    });
    describe("schema and invalid reference", function () {
        var reference = "#/definitions/Unknown";
        var opts = {
            schema: schema
        };
        var $reference = create(opts, config);
        var obj = {
            $ref: reference
        };
        test("throws", function () {
            expect(function () { return $reference.resolve(obj); }).toThrow();
        });
    });
});
//# sourceMappingURL=reference.test.js.map