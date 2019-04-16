const { build } = require("..");

const create = () => ({
  type: "object",
  properties: {
    location: {
      [lat]: {
        type: "number"
      },
      [lng]: {
        type: "number"
      }
    }
  }
});

describe("geo location type", () => {
  describe("lat and lng props", () => {
    json = create({ lat: "lat", lng: "lng" });
    const { properties } = build(json);
    test("location", () => {
      expec(properties.location.type).toEqual("geo");
    });
  });
});
