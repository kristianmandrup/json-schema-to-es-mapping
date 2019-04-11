const { createMappingItem } = require("./item");
const { arrays } = require("./data");

const create = (items, config) => {
  return createMappingItem(items, config);
};

describe.skip("MappingItem", () => {
  const strItem = {
    type: "string"
  };
  const intItem = {
    type: "integer"
  };
  const config = {};

  describe("create", () => {
    const mapper = create(strItem, config);
    describe("definitionResolver", () => {
      describe("set on config", () => {
        const definitionResolver = () => 42;
        const config = {
          definitionResolver
        };
        test("is one from config", () => {
          expect(mapper.definitionResolver).toBe(definitionResolver);
        });
      });
      describe("default", () => {
        test("is set", () => {
          expect(mapper.definitionResolver).toBeDefined();
        });
      });
    });
  });

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

      describe("validatedResolver", () => {
        describe("is a function", () => {
          test("is valid", () => {
            expect(mapper.validatedResolver).toBeTruthy();
          });
        });
        describe("is not a function", () => {
          const config = {
            itemResolver: 12
          };
          const mapper = create(items, config);
          test("is invalid", () => {
            expect(() => mapper.validatedResolver).toThrow();
          });
        });
      });
    });
  });

  describe("itemEntryPayload", () => {
    const config = {};
    const mapper = create(strItem, config);

    const payload = mapper.itemEntryPayload;
    test("has parentName", () => {
      expect(payload.parentName).toBe(mapper.key);
    });

    test("has item value", () => {
      expect(payload.value).toBe(mapper.item);
    });
  });

  describe("resolve", () => {
    const config = {};

    const mapper = create(intItem, config);
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
