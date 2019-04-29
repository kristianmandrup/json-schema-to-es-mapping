const { MappingBaseType } = require("./index");

const create = (opts, config) => new MappingBaseType(opts, config);

describe("MappingBaseType", () => {
  describe("constructor", () => {
    const opts = { key: "name", value: {} };
    describe("config", () => {
      describe("default", () => {
        const mapper = create(opts);
        test("has default config with typeMap and fieldMap", () => {
          expect(mapper.config.typeMap).toBeDefined();
          expect(mapper.config.fieldMap).toBeDefined();
        });
      });

      describe("pass in opts", () => {
        const logOn = { logging: true };
        opts.config = logOn;
        const mapper = create(opts);
        test("merged with default config", () => {
          expect(mapper.config.logging).toBe(true);
        });
      });

      describe("pass as 2nd arg", () => {
        const logOn = { logging: true };
        const mapper = create(opts, logOn);
        test("is empty object", () => {
          expect(mapper.config.logging).toBe(true);
        });
      });
    });
    describe("opts", () => {
      describe("no opts passed", () => {
        test("throws", () => {
          expect(() => create()).toThrow();
        });
      });
    });
    describe("schema", () => {});
    describe("key", () => {});
    describe("format", () => {});
    describe("result", () => {});
    describe("visitedPaths", () => {});
    describe("value", () => {});
    describe("nested", () => {});
    describe("nestingLv", () => {});
  });
});
