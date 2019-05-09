import { isString } from "./string";
import { string, objFor } from "./helpers";

describe("isString", () => {
  test("type: integer - true", () => {
    expect(isString("integer")).toBeFalsy();
  });

  test("type: string - true", () => {
    expect(isString("string")).toBeTruthy();
  });
});

describe("MappingString", () => {
  describe("config", () => {
    describe("default", () => {
      const obj = objFor();
      const mapper = string(obj);

      test("is keyword", () => {
        expect(mapper.config.typeMap.string).toEqual("keyword");
      });
    });
  });
});
