const { build, createLoc, createPoint } = require("./helpers");

describe("geo_point", () => {
  describe("string prop", () => {
    const location = {
      type: "string"
    };
    const point = createPoint({ location });
    test("location is geo_point", () => {
      expect(point.type).toEqual("geo_point");
    });
  });
});
