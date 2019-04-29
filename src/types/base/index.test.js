const { MappingBaseType } = require("./index");

const create = (opts, config) => new MappingBaseType(opts, config);

describe("MappingBaseType", () => {
  describe("constructor", () => {
    describe("config", () => {});
    describe("opts", () => {});
    describe("schema", () => {});
    describe("key", () => {});
    describe("format", () => {});
    describe("result", () => {});
    describe("visitedPaths", () => {});
    describe("value", () => {});
    describe("nested", () => {});
    describe("nestingLv", () => {});
  });

  describe("init", () => {
    const schema = {
      title: "person",
      type: "object",
      properties: {
        name: {
          type: "string"
        }
      }
    };
    describe("create keyMaker", () => {
      describe("default", () => {
        const mapper = create(schema);
        test("is undefined before init", () => {
          expect(mapper.keyMaker).toBeUndefined();
        });

        describe("initKeyMaker", () => {
          mapper.initKeyMaker();
          test("is function", () => {
            expect(typeof mapper.keyMaker).toEqual("function");
          });

          test("generates key as expected", () => {
            const opts = { key: mapper.key, parentName: mapper.parentName };
            expect(mapper.keyMaker(opts, mapper.config)).toEqual("x");
          });
        });
      });
      describe("passed in config", () => {});
    });
    describe("create entryObj", () => {
      describe("default", () => {
        const mapper = create(schema);
        test("is undefined before init", () => {
          expect(mapper.entryObj).toBeUndefined();
        });

        describe("initEntryObj", () => {
          mapper.initEntryObj();

          test("is function", () => {
            expect(typeof mapper.entryObj).toEqual("function");
          });
        });
      });
      describe("passed in config", () => {});
    });
    describe("create dispatcher", () => {
      describe("default", () => {
        const mapper = create(schema);
        test("is undefined before init", () => {
          expect(mapper.dispatcher).toBeUndefined();
        });

        describe("initDispatcher", () => {
          mapper.initDispatcher();

          test("is function", () => {
            expect(typeof mapper.dispatcher).toEqual("function");
          });
        });
      });
      describe("passed in config", () => {});
    });
    describe("create typeHandler", () => {
      describe("default", () => {
        const mapper = create(schema);
        test("is undefined before init", () => {
          expect(mapper.typeHandler).toBeUndefined();
        });

        describe("initTypeHandler", () => {
          mapper.initTypeHandler();

          test("is function", () => {
            expect(typeof mapper.typeHandler).toEqual("function");
          });
        });
      });
      describe("passed in config", () => {});
    });
    describe("create resultHandler", () => {
      describe("default", () => {
        const mapper = create(schema);
        test("is undefined before init", () => {
          expect(mapper.resultHandler).toBeUndefined();
        });

        describe("initResultHandler", () => {
          test("throws if no keyMaker", () => {
            expect(mapper.initResultHandler()).toThrow();
          });

          describe("initialized", () => {
            mapper.initResultHandler();

            test("is function", () => {
              expect(typeof mapper.resultHandler).toEqual("function");
            });
          });
        });
      });
      describe("passed in config", () => {});
    });
    describe("create referenceResolver", () => {
      describe("default", () => {});
      describe("passed in config", () => {});
    });
  });
});
