const { createItemsMapping } = require("./items");
// const { arrays } = require("../data");
const arrays = {};

const create = (items, config) => {
  return new createItemsMapping(items, config);
};

describe.skip("ItemsResolver", () => {
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

  describe("resolveItem", () => {
    describe("primitive type", () => {
      test("resolves string", () => {
        const resolved = resolver.resolveItem(strItem);
        expect(resolved).toEqual("String");
      });

      test("resolves integer", () => {
        const resolved = resolver.resolveItem(intItem);
        expect(resolved).toEqual("Int");
      });
    });

    describe("named object type", () => {
      const resolved = resolver.resolveItem({
        name: "account",
        typeName: "MyAccount",
        type: "object",
        properties: {}
      });

      test("resolves to name", () => {
        expect(resolved).toEqual("MyAccount");
      });
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
