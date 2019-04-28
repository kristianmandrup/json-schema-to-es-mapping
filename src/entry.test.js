const { createSchemaEntry } = require("./entry");

describe("SchemaEntry", () => {
  const schema = {};
  const opts = {
    key: "name",
    value: {
      type: "string"
    }
  };
  const entry = createSchemaEntry(opts);

  describe("config", () => {
    describe("no config passed", () => {
      test("uses default config", () => {
        expect(entry.config).toEqual({});
      });
    });
  });

  describe("with config that has schema", () => {
    const config = {
      logging: true,
      schema
    };

    describe("isValidSchema", () => {
      describe("invalid schema", () => {
        const opts = {
          key: "name",
          value: {}
        };
        const entry = createSchemaEntry(opts, config);

        test("is invalid (false)", () => {
          expect(entry.isValidSchema).toBeFalsy();
        });
      });

      describe("valid schema", () => {
        const opts = {
          key: "name",
          value: {
            type: "string"
          }
        };
        const entry = createSchemaEntry(opts, config);

        test("is valid (true)", () => {
          expect(entry.isValidSchema).toBeTruthy();
        });
      });
    });

    describe("typeObjMapperFor", () => {
      test("is a function", () => {
        expect(typeof entry.typeObjMapperFor).toEqual("function");
      });

      describe("pass via config", () => {
        const typeObjMapperFor = () => "x";
        const config = {
          typeObjMapperFor
        };
        const entry = createSchemaEntry(opts, config);
        test("is a function", () => {
          expect(entry.typeObjMapperFor).toBe(typeObjMapperFor);
        });
      });
    });

    describe("toEntryStringType", () => {
      describe("type is a string: number", () => {
        const opts = {
          key: "name",
          value: {
            type: "number"
          }
        };
        const entry = createSchemaEntry(opts, config);

        test("ElasticSearch mapping", () => {
          expect(entry.toEntryStringType()).toEqual({
            type: "number"
          });
        });
      });
      describe("type is an object: anyOf", () => {
        const opts = {
          key: "name",
          value: {
            type: {
              anyOf: [{ type: "number" }]
            }
          }
        };
        const entry = createSchemaEntry(opts, config);

        test("throws", () => {
          expect(() => entry.toEntryStringType()).toThrow();
        });
      });
    });

    describe("toEntryObjType", () => {
      describe("type is a string: number", () => {
        const type = "number";
        const opts = {
          key: "name",
          value: {
            type
          }
        };
        const entry = createSchemaEntry(opts, config);

        test("throws", () => {
          const fn = () => entry.toEntryObjType();
          expect(fn).toThrow();
        });
      });

      describe("type is an object: anyOf", () => {
        const type = {
          anyOf: [{ type: "number" }]
        };
        const opts = {
          key: "name",
          value: {
            type
          }
        };
        const entry = createSchemaEntry(opts, config);
        test("ES mapping", () => {
          expect(() => entry.toEntryObjType()).toThrow();

          // TODO:
          // expect(entry.toEntryObjType()).toEqual({
          //   type: "keyword"
          // });
        });
      });

      describe("toEntry", () => {
        test("type is a string: number", () => {
          expect(entry.toEntry()).toEqual({
            type: "integer"
          });
        });

        test("type is an object: anyOf", () => {
          expect(entry.toEntry()).toEqual({
            type: "keyword"
          });
        });
      });
    });
  });
});
