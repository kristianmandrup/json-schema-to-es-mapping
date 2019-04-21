const { build } = require("..");

const create = () => ({
  type: "object",
  properties: {
    uri: {
      type: "string",
      format: "url"
    }
  }
});

describe("isIp", () => {
  describe("invalid key and type", () => {
    const valid = isIp({ type: "integer" }, "x");
    expect(valid).toBeFalsy();
  });

  describe("valid key but not type", () => {
    const valid = isIp({ type: "integer" }, "url");
    expect(valid).toBeFalsy();
  });
  describe("valid ip type but not key", () => {
    const valid = isIp({ type: "string" }, "x");
    expect(valid).toBeFalsy();
  });

  describe("valid ip type and key", () => {
    const valid = isIp({ type: "string" }, "url");
    expect(valid).toBeTruthy();
  });
});

describe("toIp", () => {});

describe("MappingIp", () => {
  describe("string: url format", () => {
    const opts = {};
    const config = {};
    const $ip = createMappingIp(opts, config);
    test("ip", () => {
      expec($ip.convert()).toEqual(expected);
    });
  });
});

describe("ip type", () => {
  describe("string: url format", () => {
    json = create();
    const { properties } = build(json);
    test("ip", () => {
      expec(properties.url.type).toEqual("ip");
    });
  });
});
