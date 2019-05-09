"use strict";
var build = require("../src").build;
describe("array", function () {
    test("parent-child items", function () {
        var json = {
            $schema: "http://json-schema.org/draft-07/schema#",
            $id: "http://example.com/person.schema.json",
            title: "Person",
            description: "A person",
            type: "object",
            properties: {
                friends: {
                    description: "Names of friends",
                    type: "array",
                    reference: true,
                    items: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        };
        var config = {};
        var properties = build(json, config).properties;
        expect(properties).toEqual({
            friends: {
                _parent: { type: 'person' },
                _source: { enabled: true },
                _all: { enabled: false }
            }
        });
    });
});
//# sourceMappingURL=parent-child-doc-reference.test.js.map