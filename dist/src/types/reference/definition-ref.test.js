"use strict";
var createDefinitionRefResolver = require("./definition-ref").createDefinitionRefResolver;
describe("DefinitionRefResolver", function () {
    var reference = "#/definitions/car";
    var schema = {
        definitions: {
            car: {
                type: "object",
                name: "superCar",
                properties: {}
            }
        }
    };
    var config = {};
    var opts = { schema: schema };
    var resolver = createDefinitionRefResolver(opts, config);
    resolver.reference = reference;
    describe("refObjectFor", function () {
        var obj = resolver.refObjectFor(reference);
        test("resolves to referenced object", function () {
            expect(obj).toEqual({});
        });
    });
});
//# sourceMappingURL=definition-ref.test.js.map