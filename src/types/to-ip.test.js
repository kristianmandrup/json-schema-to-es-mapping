const { isIp, toIp, MappingIp } = require("./ip");

const create = opts => ({
  type: "string",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return { key: opts.key || "ip", type: value.type, value, schema, config };
};

const ip = opts => {
  const $opts = objFor(opts);
  return toIp($opts);
};

describe("isIp", () => {
  test("type: string, key: ip - true", () => {
    expect(isIp({ type: "string" })).toBeTruthy();
  });

  test("type: string, key: ip - true", () => {
    expect(isIp({ type: "string", key: "ipAdr" })).toBeTruthy();
  });

  test("type: string, key: myIp - false", () => {
    expect(isIp({ type: "string", key: "myIp" })).toBeFalsy();
  });

  test("type: integer - false", () => {
    expect(isIp({ type: "integer" })).toBeFalsy();
  });

  test("type: ip - false", () => {
    expect(isIp({ type: "ip" })).toBeFalsy();
  });
});

describe.only("MappingIp", () => {
  const obj = objFor();
  const mapper = MappingIp.create(obj);

  describe("type", () => {
    test("default: is ip", () => {
      expect(mapper.type).toEqual("ip");
    });
  });
});
