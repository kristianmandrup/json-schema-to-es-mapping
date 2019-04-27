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

describe("ip type", () => {
  describe("string: ip format", () => {
    json = create();
    const { properties } = build(json);
    test("ip", () => {
      expect(properties.ip.type).toEqual("ip");
    });
  });
});
