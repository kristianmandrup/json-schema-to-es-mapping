const { createItemsMapping } = require("./items");
const { arrays } = require("./data");
const arrays = {};

const create = (items, config) => {
  return new createItemsMapping(items, config);
};

describe.skip("ItemsMapping", () => {
  const strItem = {
    type: "string"
  };
  const intItem = {
    type: "integer"
  };
  const items = [strItem, intItem];
  const config = {};

  const resolver = create(items, config);

  describe("typeResolver", () => {
    const resolved = resolver.typeResolver(strItem);
    test("resolves", () => {
      expect(resolved).toEqual("String");
    });
  });

  describe("resolve", () => {
    const resolved = resolver.resolve();

    test("resolves", () => {
      expect(resolved).toEqual(["String", "Int"]);
    });
  });

  describe("array with an integer enum type", () => {
    const { numberOfChildren } = arrays;
    const { items } = numberOfChildren;
    const resolver = create(items, config);
    const numericEnum = items[0];
    describe("resolveItem", () => {
      const resolved = resolver.resolveItem(numericEnum);
      test("single enum type resolved", () => {
        expect(resolved).toEqual("Enum");
      });
    });

    describe("resolve", () => {
      const resolved = resolver.resolve();
      test("single enum type resolved", () => {
        expect(resolved).toEqual(["Enum"]);
      });
    });
  });
});
