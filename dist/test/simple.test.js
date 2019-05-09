"use strict";
var build = require("../src").build;
describe("build - simple properties", function () {
    var json = {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "http://example.com/person.schema.json",
        title: "Person",
        description: "A person",
        type: "object",
        properties: {
            name: {
                description: "Name of the person",
                type: "string"
            },
            age: {
                description: "Age of person",
                type: "number",
                required: true
            }
        },
        required: ["name"]
    };
    var received = [];
    var onResult = function (result) {
        // console.log("received", result);
        received.push(result);
    };
    var config = { onResult: onResult };
    var _a = build(json, config), properties = _a.properties, results = _a.results;
    test("received", function () {
        // console.log({ properties, received, results });
        // console.log("SIMPLE", JSON.stringify(properties, null, 2));
        expect(received[1]).toEqual({
            key: "age",
            parentName: "person",
            resultKey: "age",
            schemaValue: {
                description: "Age of person",
                required: true,
                type: "number"
            },
            type: "integer"
        });
    });
    test("results", function () {
        expect(results).toEqual({
            age: { type: "integer" },
            name: { type: "keyword" }
        });
    });
    test("properties", function () {
        expect(properties).toEqual({
            name: {
                type: "keyword"
            },
            age: {
                type: "integer"
            }
        });
    });
});
//# sourceMappingURL=simple.test.js.map