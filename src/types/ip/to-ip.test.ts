const { isIpKey, isIp, toIp, MappingIp } = require("./ip");

const create = opts => ({
  type: "string",
  ...opts
});

const createMappingIp = opts => {
  const $opts = objFor(opts);
  return MappingIp.create($opts);
};

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

describe("isIpKey", () => {
  test("undefined - false", () => {
    expect(isIpKey(undefined)).toBeFalsy();
  });

  test("ip - true", () => {
    expect(isIpKey("ip")).toBeTruthy();
  });

  test("ipAdr - true", () => {
    expect(isIpKey("ipAdr")).toBeTruthy();
  });
});

describe("isIp", () => {
  test("type: string, key: ip - true", () => {
    expect(isIp({ type: "string", key: "ip" })).toBeTruthy();
  });

  test("{type: string}, 'ip' - true", () => {
    expect(isIp({ type: "string" }, "ip")).toBeTruthy();
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

describe("MappingIp", () => {
  const obj = objFor();
  const mapper = MappingIp.create(obj);

  describe("type", () => {
    test("default: is ip", () => {
      expect(mapper.type).toEqual("ip");
    });
  });
});

describe("MappingIp", () => {
  describe("string: ip format", () => {
    const opts = {};
    const config = {};
    const $ip = createMappingIp(opts, config);
    const expected = {
      type: "ip"
    };
    test("ip", () => {
      expect($ip.convert()).toEqual(expected);
    });
  });
});
