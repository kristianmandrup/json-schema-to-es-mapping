const {
  isPointType,
  isPointArray,
  isPointArrayItem,
  isPointArrayItems,
  hasNumericItem,
  short,
  full,
  isLocationKey,
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
      type: "integer"
    };
    expect(
      isPointArray({ type: "array", minItems: 2, maxItems: 2, items })
    ).toBeTruthy();
  });

  test("type: array, items: integer", () => {
    const items = [
      {
        type: "integer"
      },
      {
        type: "integer"
      }
    ];
    expect(isPointArray({ type: "array", items })).toBeTruthy();
  });
});

describe("isPointArrayItem", () => {
  test("type: array, items: integer", () => {
    const obj = { type: "array", minItems: 2, maxItems: 2 };
    const item = {
      type: "integer"
    };
    expect(isPointArrayItem(obj, item)).toBeTruthy();
  });
});

describe("isPointArrayItems", () => {
  test("type: array, items: integer", () => {
    const items = [
      {
        type: "integer"
      },
      {
        type: "integer"
      }
    ];
    expect(isPointArrayItems(items)).toBeTruthy();
  });
});

describe("hasNumericItem", () => {
  const items = [
    {
      type: "integer"
    },
    {
      type: "integer"
    }
  ];
  test("type: number", () => {
    expect(hasNumericItem(items, 0)).toBeTruthy();
  });
});

describe("short", () => {
  test("lat - false", () => {
    expect(
      short({
        lat: {
          type: "number"
        }
      })
    ).toBeFalsy();
  });

  test("lng - false", () => {
    expect(short({ lng: { type: "number" } })).toBeFalsy();
  });

  test("lat and lng", () => {
    expect(
      short({
        lat: {
          type: "number"
        },
        lng: { type: "number" }
      })
    ).toBeTruthy();
  });
});

describe("full", () => {
  test("latitude - false", () => {
    expect(
      full({
        latitude: {
          type: "number"
        }
      })
    ).toBeFalsy();
  });

  test("longitude  - false", () => {
    expect(full({ longitude: { type: "number" } })).toBeFalsy();
  });

  test("latitude and longitude - true", () => {
    expect(
      full({
        latitude: {
          type: "number"
        },
        longitude: { type: "number" }
      })
    ).toBeTruthy();
  });
});

// location

describe("isGeoPoint", () => {
  test("type: string, key: location - true", () => {
    expect(isGeoPoint({ type: "string" }, "location")).toBeTruthy();
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
