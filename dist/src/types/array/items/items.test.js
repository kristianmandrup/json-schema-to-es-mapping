"use strict";
var createItemsMapping = require("./items").createItemsMapping;
var arrays = require("../data").arrays;
var create = function (opts, config) {
    return createItemsMapping(opts, config);
};
describe("ItemsMapping", function () {
    var strItem = {
        type: "string"
    };
    var intItem = {
        type: "integer"
    };
    var owner = { name: "person" };
    var items = [strItem, intItem];
    var config = {};
    var opts = { items: items, owner: owner };
    var resolver = create(opts, config);
    describe("typeResolver", function () {
        var resolved = resolver.typeResolver(strItem);
        test("resolves", function () {
            expect(resolved).toEqual({
                type: "keyword"
            });
        });
    });
    describe("resolve", function () {
        var resolved = resolver.resolve();
        test("resolves", function () {
            expect(resolved).toEqual([
                {
                    type: "keyword"
                },
                {
                    type: "integer"
                }
            ]);
        });
    });
    describe("array with an integer enum type", function () {
        var numberOfChildren = arrays.numberOfChildren;
        var items = numberOfChildren.items;
        var opts = { items: items, owner: owner };
        var resolver = create(opts, config);
        var numericEnum = items[0];
        describe("resolveItem", function () {
            var resolved = resolver.resolveItem(numericEnum);
            test("single enum type resolved", function () {
                expect(resolved).toEqual({
                    type: "integer"
                });
            });
        });
        describe("resolve", function () {
            var opts = { items: items, owner: owner };
            var resolver = create(opts, config);
            var resolved = resolver.resolve();
            test("single enum type resolved", function () {
                expect(resolved).toEqual([
                    {
                        type: "integer"
                    }
                ]);
            });
        });
    });
});
//# sourceMappingURL=items.test.js.map