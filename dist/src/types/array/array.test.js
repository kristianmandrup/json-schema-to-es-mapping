"use strict";
var build = require("../..").build;
describe("array", function () {
    test("no items", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friendNames: {
                    description: "Names of friends",
                    type: "array"
                }
            }
        };
        var config = {};
        var properties = build(json, config).properties;
        // console.log({ mapping });
        // console.log("Array - no items", JSON.stringify(mapping, null, 2));
        expect(properties).toEqual({
            friendNames: {
                // include_in_parent: true,
                type: "nested"
            }
        });
    });
    test("empty items", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friendNames: {
                    description: "Names of friends",
                    type: "array",
                    items: {}
                }
            }
        };
        var config = {};
        var properties = build(json, config).properties;
        // console.log({ properties });
        // console.log("Array - no items", JSON.stringify(properties, null, 2));
        expect(properties).toEqual({
            friendNames: {
                // include_in_parent: true,
                type: "nested"
            }
        });
    });
    test("empty items", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friendNames: {
                    description: "Names of friends",
                    type: "array",
                    items: {}
                }
            }
        };
        var config = {};
        var properties = build(json, config).properties;
        // console.log({ properties });
        // console.log("Array - empty items", JSON.stringify(properties, null, 2));
        expect(properties).toEqual({
            friendNames: {
                // include_in_parent: true,
                type: "nested"
            }
        });
    });
    test("items object - string type", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friendNames: {
                    description: "Names of friends",
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            }
        };
        var config = {
            typeMap: {
                string: "string"
            }
        };
        var properties = build(json, config).properties;
        // console.log({ properties });
        // console.log("Array - empty items", JSON.stringify(properties, null, 2));
        expect(properties).toEqual({
            friendNames: {
                // include_in_parent: true,
                type: "string"
            }
        });
    });
    test("items array - one item string type", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friendNames: {
                    description: "Names of friends",
                    type: "array",
                    items: [
                        {
                            type: "string"
                        }
                    ]
                }
            }
        };
        var config = {
            typeMap: {
                string: "text"
            }
        };
        var properties = build(json, config).properties;
        // console.log({ properties });
        // console.log("Array - empty items", JSON.stringify(properties, null, 2));
        expect(properties).toEqual({
            friendNames: {
                // include_in_parent: true,
                type: "text"
            }
        });
    });
    describe("items array - two items string and number type", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friendNames: {
                    description: "Names of friends",
                    type: "array",
                    items: [
                        {
                            type: "string"
                        },
                        {
                            type: "number"
                        }
                    ]
                }
            }
        };
        var config = {};
        test("throws", function () {
            var fn = function () { return build(json, config); };
            expect(fn).toThrow();
        });
    });
});
//# sourceMappingURL=array.test.js.map