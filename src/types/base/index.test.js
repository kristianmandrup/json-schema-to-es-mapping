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
      describe("default", () => {
        const mapper = create(opts);
        test("sets result to empty object", () => {
          expect(mapper.result).toEqual({});
        });
      });

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
        test("sets result", () => {
          expect(mapper.result).toEqual(result);
        });
      });
    });
    describe("visitedPaths", () => {
      describe("default", () => {
        const mapper = create(opts);
        test("sets visitedPaths to empty object", () => {
          expect(mapper.visitedPaths).toEqual({});
        });
      });

      describe("visitedPaths passed in config", () => {
        const visitedPaths = {
          x: true
        };
        const mapper = create(opts, { visitedPaths });
        test("sets visitedPaths", () => {
          expect(mapper.visitedPaths).toEqual(visitedPaths);
        });
      });
    });
    describe("value", () => {
      describe("value passed in opts", () => {
        const name = {
          type: "string"
        };
        const value = {
          name
        };
        opts.value = value;
        const mapper = create(opts);
        test("sets value", () => {
          expect(mapper.value).toEqual(value);
        });
      });
    });
    describe("nested", () => {
      describe("default", () => {
        const mapper = create(opts);
        test("sets nested to false", () => {
          expect(mapper.nested).toBeFalsy();
        });
      });

      describe("nested passed in opts", () => {
        const nested = true;
        const config = {
          nested
        };
        const mapper = create(opts, config);
        test("sets value", () => {
          expect(mapper.nested).toEqual(nested);
        });
      });
    });
    describe("nestingLv", () => {
      describe("default", () => {
        const mapper = create(opts);
        test("sets nestingLv to 0", () => {
          expect(mapper.nestingLv).toBe(0);
        });
      });

      describe("nestingLv passed in opts", () => {
        const nestingLv = 2;
        const config = {
          nestingLv
        };
        const mapper = create(opts, config);
        test("sets nestingLv to passed", () => {
          expect(mapper.nestingLv).toEqual(nestingLv);
        });
      });
    });
  });

  describe("validateSchema", () => {
    describe("schema passed", () => {
      test("throws", () => {
        opts.schema = {};
        const mapper = create(opts);
        expect(() => mapper.validateSchema()).not.toThrow();
      });
    });

    describe("no schema passed", () => {
      test("throws", () => {
        const mapper = create();
        expect(() => mapper.validateSchema()).toThrow();
      });
    });
  });

  describe("init", () => {
    const mapper = create();
    mapper.init();

    test("sets composer", () => {
      expect(mapper.composer).toBeDefined();
    });

    test("sets typeHandler", () => {
      expect(mapper.typeHandler).toBeDefined();
    });

    test("sets resultHandler", () => {
      expect(mapper.resultHandler).toBeDefined();
    });

    // TODO: more...
  });

  describe("resolveValue", () => {
    const mapper = create();

    describe("no init", () => {
      test("throws", () => {
        expect(() => mapper.resolve()).toThrow();
      });
    });

    describe("init", () => {
      mapper.init();
      test("resolves", () => {
        const resolved = mapper.resolve();
        expect(resolved).toBeDefined();
      });
    });
  });

  describe("calculatedType", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test("resolves", () => {
        const type = mapper.calculatedType;
        expect(type).toBeDefined();
      });
    });
  });

  describe("type", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test("resolves", () => {
        const calcType = mapper.calculatedType;
        const type = mapper.type;
        const baseType = mapper.baseType;
        console.log({ calcType, type, baseType });
        expect(type).toBeDefined();
      });
    });
  });

  describe("typeMap", () => {
    const mapper = create();
    test("resolves", () => {
      const typeMap = mapper.typeMap;
      expect(typeMap).toBeDefined();
    });
  });

  describe("typeName", () => {
    const mapper = create();
    test("throws - needs override by subclass", () => {
      expect(() => mapper.typeName).toThrow();
    });
  });

  describe("dispatch", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test.skip("dispatch", done => {
        // TODO: setup dispatc callback with done and expectation
        // mapper.
        // expect(res).toBeDefined();
        mapper.dispatch();
      });
    });
  });

  describe("convert", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test("converts", () => {
        const mapping = mapper.convert();
        expect(mapping).toBeDefined();
      });
    });
  });

  describe("createMappingResult", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test("creates mapping result", () => {
        const mapping = mapper.createMappingResult();
        expect(mapping).toBeDefined();
      });
    });
  });

  describe("createAndStoreResult", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test("creates mapping result", () => {
        const res = mapper.createAndStoreResult();
        const result = mapper.result;
        expect(res).toEqual(result);
      });
    });
  });

  describe("result", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      test("undefined", () => {
        const result = mapper.result;
        expect(result).toBeUndefined();
      });
    });
  });

  describe("resolve", () => {
    const mapper = create();
    describe("init", () => {
      mapper.init();

      describe("empty cache", () => {
        test("undefined", () => {
          const resolved = mapper.resolve();
          const { wasCacheHit } = mapper;
          expect(resolved).toBeDefined();
          expect(wasCacheHit).toBeFalsy();
        });
      });

      describe.skip("cache with no hit", () => {
        mapper.init();

        // TODO: setup cache with non-matching entry

        const resolved = mapper.resolve();
        const { wasCacheHit } = mapper;
        expect(resolved).toBeDefined();
        expect(wasCacheHit).toBeFalsy();
      });

      describe.skip("cache with hit", () => {
        mapper.init();

        // TODO: setup cache with matching entry

        const resolved = mapper.resolve();
        const { wasCacheHit } = mapper;
        expect(resolved).toBeDefined();
        expect(wasCacheHit).toBeFalsy();
      });
    });
  });
});
