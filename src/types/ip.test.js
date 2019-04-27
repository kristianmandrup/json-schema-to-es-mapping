const { build } = require("..");

const create = () => ({
  type: "object",
  properties: {
    ip: {
      type: "string",
      format: "ip"
    }
  }
});

describe("isIp", () => {
  describe("invalid key and type", () => {
    const valid = isIp({ type: "integer" }, "x");
    expect(valid).toBeFalsy();
  });

  describe("valid key but not type", () => {
    const valid = isIp({ type: "integer" }, "ip");
    expect(valid).toBeFalsy();
  });
  describe("valid ip type but not key", () => {
    const valid = isIp({ type: "string" }, "x");
    expect(valid).toBeFalsy();
  });

  describe("valid ip type and key", () => {
    const valid = isIp({ type: "string" }, "ip");
    expect(valid).toBeTruthy();
  });
});

describe("toIp", () => {});

describe("MappingIp", () => {
  describe("string: ip format", () => {
    const opts = {};
    const config = {};
    const $ip = createMappingIp(opts, config);
    test.skip("ip", () => {
      expect($ip.convert()).toEqual(expected);
    });
  });
});

describe("ip type", () => {
  describe("string: ip format", () => {
    json = create();
    const { properties } = build(json);
    test.skip("ip", () => {
      expect(properties.ip.type).toEqual("ip");
    });
  });
});
