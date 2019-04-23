const { createTypeHandler } = require("./type-handler");

const create = createTypeHandler;

const Project = {
  type: "object",
  properties: {
    title: {
      type: "string"
    }
  }
};
const schema = {
  definitions: {
    Project
  }
};

describe("TypeHandler", () => {
  const config = {
    typeMap: {
      string: "keyword"
    }
  };
  const typeName = "string";
  const entry = {
    type: "string"
  };
  const handler = create({ typeName, entry }, config);
  describe("metaType", () => {
    test("string", () => {
      expect(handler.metaType).toEqual("keyword");
    });
  });

  describe("type", () => {
    test("string", () => {
      expect(handler.type).toEqual("string");
    });
  });
});
