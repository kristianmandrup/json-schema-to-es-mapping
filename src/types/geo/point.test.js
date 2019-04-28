const { build } = require("../..");

const create = ({ lat, lng }) => ({
  type: "object",
  properties: {
    location: {
      type: "object",
      properties: {
        [lat]: {
          type: "number"
        },
        [lng]: {
          type: "number"
        }
      }
    }
  }
});

const createLoc = location => ({
  type: "object",
  properties: location
});

describe("geo location type", () => {
  describe("lat and lng props", () => {
    json = create({ lat: "lat", lng: "lng" });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expect(properties.location.type).toEqual("geo_point");
    });
  });

  describe("latitude and longitude props", () => {
    json = create({ lat: "latitude", lng: "longitude" });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expect(properties.location.type).toEqual("geo_point");
    });
  });

  describe("string prop", () => {
    const location = {
      type: "string"
    };
    json = createLoc({ location });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expect(properties.location.type).toEqual("geo_point");
    });
  });

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
    console.log({ json });
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
