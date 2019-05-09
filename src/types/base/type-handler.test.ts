import { createTypeHandler } from "./type-handler";

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

  describe("default calcType function used", () => {
    describe("typeMap typeName used", () => {
      const handler = create({ typeName }, config);
      describe("type", () => {
        test("entry type string", () => {
          expect(handler.type).toEqual("keyword");
        });
      });
    });

    describe("entry object passed", () => {
      const handler = create({ typeName, entry }, config);

      describe("type", () => {
        test("entry type string", () => {
          expect(handler.type).toEqual("string");
        });
      });
    });
  });

  describe("type value passed", () => {
    const type = "string";
    const handler = create({ typeName, entry, type }, config);

    describe("type", () => {
      test("string", () => {
        expect(handler.type).toEqual("string");
      });
    });
  });

  describe("calcType function passed", () => {
    const handler = create({ typeName, entry, calcType }, config);
    describe("typeMapValue", () => {
      test("string", () => {
        expect(handler.typeMapValue).toEqual("keyword");
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
});
