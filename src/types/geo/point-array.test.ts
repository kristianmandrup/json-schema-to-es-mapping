const { build, createLoc } = require("./helpers");
describe("geo_point", () => {
  describe("numeric array prop", () => {
    const location = {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "number"
      }
    };
    json = createLoc({ location });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expect(properties.location.type).toEqual("geo_point");
    });
  });

  describe("string array prop", () => {
    const location = {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: {
        type: "string"
      }
    };
    json = createLoc({ location });
    // console.log({ json });
    const { properties } = build(json);
    test("location not geo_point", () => {
      expect(properties.location.type).not.toEqual("geo_point");
    });
  });
});
