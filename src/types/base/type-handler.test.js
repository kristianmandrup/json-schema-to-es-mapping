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

  const calcType = () => "text";

  const entry = {
    type: "string"
  };
  const handler = create({ typeName, entry, calcType }, config);
  describe("metaType", () => {
    test("string", () => {
      expect(handler.metaType).toEqual("keyword");
    });
  });

  describe("calcType", () => {
    test("string", () => {
      expect(handler.calcType()).toEqual("text");
    });
  });

  describe("type", () => {
    test("string", () => {
      expect(handler.type).toEqual("string");
    });
  });
});
