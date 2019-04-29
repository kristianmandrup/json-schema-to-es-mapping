const { MappingBaseType } = require("./index");

const create = (opts, config) => new MappingBaseType(opts, config);

describe("MappingBaseType", () => {
  describe("constructor", () => {
    const key = "name";
    const value = {};
    const opts = { key, value };
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

    describe.only("validateInit", () => {
      describe("no opts passed", () => {
        test("throws", () => {
          const mapper = create();
          expect(() => mapper.validateInit()).toThrow();
        });
      });
    });

    describe("opts", () => {
      describe("no opts passed", () => {
        const mapper = create();
        test("throws", () => {
          expect(() => mapper.validateInit()).toThrow();
        });
      });

      describe("empty opts passed", () => {
        const mapper = create({});
        test("throws", () => {
          expect(() => mapper.validateInit()).toThrow();
        });
      });

      describe.only("only key and value passed", () => {
        const mapper = create(opts);
        test("throws", () => {
          expect(() => mapper.validateInit()).toThrow();
        });
      });
    });

    describe("schema", () => {
      const schema = {};
      describe("no schema passed", () => {
        const mapper = create({ ...opts });
        test("throws", () => {
          expect(() => mapper.validateInit()).toThrow();
        });
      });

      describe("schema passed in opts", () => {
        const mapper = create({ ...opts, schema });
        test("no throw", () => {
          expect(() => mapper.validateInit()).not.toThrow();
        });
      });

      describe("schema passed in opts.config", () => {
        opts.config = { schema };
        const mapper = create(opts);
        test("no throw", () => {
          expect(() => mapper.validateInit()).not.toThrow();
        });
      });
    });
    describe("key", () => {
      describe("key: name passed", () => {
        const mapper = create(opts);
        test("throws", () => {
          expect(mapper.key).toEqual(key);
        });
      });
    });
    describe("format", () => {
      describe("format: email passed in value", () => {
        const format = "email";
        opts.value.format = format;
        const mapper = create(opts);
        test("throws", () => {
          expect(mapper.format).toEqual(format);
        });
      });
    });
    describe("result", () => {
      describe("result passed", () => {
        const name = {
          type: "string"
        };
        const result = [
          {
            name
          }
        ];
        const mapper = create(opts, { result });
        test("throws", () => {
          expect(mapper.result).toEqual(result);
        });
      });
    });
    describe("visitedPaths", () => {});
    describe("value", () => {});
    describe("nested", () => {});
    describe("nestingLv", () => {});
  });
});
