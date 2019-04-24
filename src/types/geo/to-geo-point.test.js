const { isGeoLocation, toGeoLocation, MappingGeoLocation } = require("./point");

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

const location = opts => {
  const $opts = objFor(opts);
  return toIp($opts);
};

describe("isGeoLocation", () => {
  test("type: string, key: location - true", () => {
    expect(isGeoLocation({ type: "string" })).toBeTruthy();
  });

  test("type: string, key: location - true", () => {
    expect(isGeoLocation({ type: "string", key: "locationAdr" })).toBeTruthy();
  });

  test("type: string, key: myIp - false", () => {
    expect(isGeoLocation({ type: "string", key: "myIp" })).toBeFalsy();
  });

  test("type: integer - false", () => {
    expect(isGeoLocation({ type: "integer" })).toBeFalsy();
  });

  test("type: location - false", () => {
    expect(isGeoLocation({ type: "location" })).toBeFalsy();
  });
});

describe.only("MappingGeoLocation", () => {
  const obj = objFor();
  const mapper = MappingGeoLocation.create(obj);

  describe("type", () => {
    test("default: is location", () => {
      expect(mapper.type).toEqual("geo_point");
    });
  });
});
