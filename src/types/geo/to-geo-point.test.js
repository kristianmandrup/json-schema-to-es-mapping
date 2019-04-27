const {
  isPointType,
  isPointArray,
  hasNumericItem,
  short,
  full,
  location,
  isGeoPoint,
  toGeoPoint,
  MappingGeoPoint
} = require("./point");

const create = opts => ({
  type: "string",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return {
    key: opts.key || "location",
    type: value.type,
    value,
    schema,
    config
  };
};

const point = opts => {
  const $opts = objFor(opts);
  return toGeoPoint($opts);
};

describe("isPointType,", () => {
  test("type: string, key: location - true", () => {
    expect(isPointType({ type: "string" })).toBeTruthy();
  });
});

describe("isPointArray", () => {
  test("type: array, items: integer", () => {
    const items = {
      type: "integer",
      minItems: 2,
      maxItems: 2
    };
    expect(isPointArray({ type: "array", items })).toBeTruthy();
  });
});

describe("hasNumericItem", () => {
  test("type: number", () => {
    expect(hasNumericItem({ type: "number" })).toBeTruthy();
  });
});

describe("short", () => {
  test("lat", () => {
    expect(
      short({
        lat: {
          type: "number"
        }
      })
    ).toBeTruthy();
  });

  test("lng", () => {
    expect(short({ lng: { type: "number" } })).toBeTruthy();
  });
});

describe("full", () => {
  test("latitude", () => {
    expect(
      full({
        lat: {
          type: "number"
        }
      })
    ).toBeTruthy();
  });

  test("lng", () => {
    expect(full({ longitude: { type: "number" } })).toBeTruthy();
  });
});

// location

describe("isGeoPoint", () => {
  test("type: string, key: location - true", () => {
    expect(isGeoPoint({ type: "string" })).toBeTruthy();
  });

  test("type: string, key: location - true", () => {
    expect(isGeoPoint({ type: "string", key: "locationAdr" })).toBeTruthy();
  });

  test("type: string, key: myIp - false", () => {
    expect(isGeoPoint({ type: "string", key: "myIp" })).toBeFalsy();
  });

  test("type: integer - false", () => {
    expect(isGeoPoint({ type: "integer" })).toBeFalsy();
  });

  test("type: location - false", () => {
    expect(isGeoPoint({ type: "location" })).toBeFalsy();
  });
});

describe("MappingGeoPoint", () => {
  const obj = objFor();
  const mapper = MappingGeoPoint.create(obj);

  describe("type", () => {
    test("default: is location", () => {
      expect(mapper.type).toEqual("geo_point");
    });
  });
});
