const { toString, MappingString } = require("./string");
const { string, objFor } = require("./helpers");

describe("MappingString", () => {
  describe("typeMap override: string -> text", () => {
    const config = {
      typeMap: {
        string: "text"
      }
    };
    const obj = objFor({ config });
    const mapper = string(obj);

    test("is text", () => {
      expect(mapper.config.typeMap.string).toEqual("text");
    });
  });
});

describe("typeMap", () => {
  describe("default", () => {
    const obj = objFor();
    const mapper = string(obj);

    test("is keyword", () => {
      expect(mapper.typeMap.string).toEqual("keyword");
    });
  });

  describe("typeMap override: string -> text", () => {
    const config = {
      typeMap: {
        string: "text"
      }
    };
    const obj = objFor({ config });
    const mapper = string(obj);

    test("is text", () => {
      expect(mapper.typeMap.string).toEqual("text");
    });
  });
});

describe("type", () => {
  describe("default", () => {
    const obj = objFor();
    const mapper = string(obj);

    test("is keyword", () => {
      expect(mapper.type).toEqual("keyword");
    });
  });

  describe("typeMap override: string -> text", () => {
    const config = {
      typeMap: {
        string: "text",
        x: "X"
      }
    };
    const obj = objFor({ config });
    const mapper = string(obj);

    test("is text", () => {
      expect(mapper.type).toEqual("text");
    });
  });
});
