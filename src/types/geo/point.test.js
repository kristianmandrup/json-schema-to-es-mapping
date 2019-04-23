const { build } = require("../..");

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

const createLoc = location => ({
  type: "object",
  properties: {
    location
  }
});

describe("geo location type", () => {
  describe("lat and lng props", () => {
    json = create({ lat: "lat", lng: "lng" });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expec(properties.location.type).toEqual("geo_point");
    });
  });

  describe("latitude and longitude props", () => {
    json = create({ lat: "latitude", lng: "longitude" });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expec(properties.location.type).toEqual("geo_point");
    });
  });

  describe("string prop", () => {
    const location = {
      type: "string"
    };
    json = createLoc({ location });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expec(properties.location.type).toEqual("geo_point");
    });
  });

  describe("numeric array prop", () => {
    const location = {
      type: "array",
      maxItems: 2,
      items: {
        type: "integer"
      }
    };
    json = createLoc({ location });
    const { properties } = build(json);
    test("location is geo_point", () => {
      expec(properties.location.type).toEqual("geo_point");
    });
  });

  describe("string array prop", () => {
    const location = {
      type: "array",
      maxItems: 2,
      items: {
        type: "string"
      }
    };
    json = createLoc({ location });
    const { properties } = build(json);
    test("location not geo_point", () => {
      expec(properties.location.type).not.toEqual("geo_point");
    });
  });
});
