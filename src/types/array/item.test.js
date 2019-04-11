const { createMappingItem } = require("./item");
// const { arrays } = require("../data");

const create = (items, config) => {
  return createMappingItem(items, config);
};

describe.skip("Item Resolver", () => {
  const strItem = {
    type: "string"
  };
  const intItem = {
    type: "integer"
  };

  describe("resolver", () => {
    describe("no resolver in config", () => {
      const config = {};
      const mapper = create(items, config);
      test("uses default resolver", () => {
        expect(mapper.resolver).toBeDefined();
      });

      describe("validResolver", () => {
        test("is valid", () => {
          expect(mapper.validResolver).toBeTruthy();
        });
      });
    });

    describe("resolver in config", () => {
      const config = {
        itemResolver: () => 42
      };
      const mapper = create(items, config);
      test("uses config itemResolver", () => {
        expect(mapper.resolver).toBeDefined();
      });

      describe("validResolver", () => {
        describe("is a function", () => {
          test("is valid", () => {
            expect(mapper.validResolver).toBeTruthy();
          });
        });
        describe("is not a function", () => {
          const config = {
            itemResolver: 12
          };
          const mapper = create(items, config);
          test("is invalid", () => {
            expect(() => mapper.validResolver).toThrow();
          });
        });
      });
    });
  });

  describe("resolve", () => {
    const items = [strItem, intItem];
    const config = {};

    const mapper = create(items, config);
    describe("primitive type", () => {
      test("resolves string", () => {
        const resolved = mapper.resolve(strItem);
        expect(resolved).toEqual("String");
      });

      test("resolves integer", () => {
        const resolved = mapper.resolve(intItem);
        expect(resolved).toEqual("Int");
      });
    });

    describe("named object type", () => {
      const resolved = mapper.resolve({
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
});
