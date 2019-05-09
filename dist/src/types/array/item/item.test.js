"use strict";
var createMappingItemFactory = require("./item").createMappingItemFactory;
var createFactory = createMappingItemFactory;
describe("MappingItem", function () {
    var strItem = {
        type: "string"
    };
    var intItem = {
        type: "integer"
    };
    var config = {};
    describe.skip("create", function () { });
    describe("resolver", function () {
        describe("no resolver in config", function () {
            var config = {};
            var createMapper = createFactory(config);
            var mapper = createMapper({ item: strItem });
            test("uses default resolver", function () {
                expect(mapper.resolver).toBeDefined();
            });
        });
        describe("resolver in config", function () {
            var config = {
                itemResolver: function () { return 42; }
            };
            var createMapper = createFactory(config);
            var mapper = createMapper({ item: strItem });
            test("uses config itemResolver", function () {
                expect(mapper.resolver).toBeDefined();
            });
            describe("validatedResolver", function () {
                describe("is a function", function () {
                    test("is valid", function () {
                        expect(mapper.validatedResolver).toBeTruthy();
                    });
                });
                describe("is not a function", function () {
                    var config = {
                        itemResolver: 12
                    };
                    var createMapper = createFactory(config);
                    var mapper = createMapper({ item: strItem });
                    test("is invalid", function () {
                        expect(function () { return mapper.validatedResolver; }).toThrow();
                    });
                });
            });
        });
    });
    describe("itemEntryPayload", function () {
        var config = {};
        var createMapper = createFactory(config);
        var mapper = createMapper({ item: strItem });
        var payload = mapper.itemEntryPayload;
        test("has parentName", function () {
            expect(payload.parentName).toBe(mapper.key);
        });
        test("has item value", function () {
            expect(payload.value).toBe(mapper.item);
        });
    });
    describe("resolve", function () {
        var config = {};
        var createMapper = createFactory(config);
        var mapper = createMapper({ item: intItem });
        describe("primitive type", function () {
            test("resolves string", function () {
                var resolved = mapper.resolve(strItem);
                expect(resolved).toEqual({ type: "keyword" });
            });
            test("resolves integer", function () {
                var resolved = mapper.resolve(intItem);
                expect(resolved).toEqual({ type: "integer" });
            });
        });
        describe("named object type", function () {
            var resolved = mapper.resolve({
                name: "account",
                typeName: "MyAccount",
                type: "object",
                properties: {
                    level: {
                        type: "integer"
                    }
                }
            });
            test("resolves to name", function () {
                expect(resolved).toEqual({
                    properties: { level: { type: "integer" } },
                    type: "object"
                });
            });
        });
    });
});
//# sourceMappingURL=item.test.js.map