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
        test("is function", () => {
          expect(typeof mapper.keyMaker).toEqual("function");
        });

        test("generates key as expected", () => {
          const opts = { key: mapper.key, parentName: mapper.parentName };
          expect(mapper.keyMaker(opts, mapper.config)).toEqual("x");
        });
      });
      describe("passed in config", () => {});
    });
    describe("create entryObj", () => {
      describe("default", () => {});
      describe("passed in config", () => {});
    });
    describe("create dispatcher", () => {
      describe("default", () => {});
      describe("passed in config", () => {});
    });
    describe("create typeHandler", () => {
      describe("default", () => {});
      describe("passed in config", () => {});
    });
    describe("create resultHandler", () => {
      describe("default", () => {});
      describe("passed in config", () => {});
    });
    describe("create referenceResolver", () => {
      describe("default", () => {});
      describe("passed in config", () => {});
    });
  });
});
