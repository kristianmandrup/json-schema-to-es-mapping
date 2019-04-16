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

describe("ip type", () => {
  describe("string: url format", () => {
    json = create();
    const { properties } = build(json);
    test("ip", () => {
      expec(properties.url.type).toEqual("ip");
    });
  });
});
