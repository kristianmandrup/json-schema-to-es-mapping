const { isNumber, toNumber, MappingNumber } = require("./number");

const create = opts => ({
  type: "number",
  ...opts
});

const config = {};
const schema = {};

const objFor = opts => {
  const value = create(opts);
  return { key: "votes", type: value.type, value, schema, config };
};

const number = opts => {
  const $opts = objFor(opts);
  return toNumber($opts);
};

const result = {
  byte: {
    type: "byte"
  },
  shirt: {
    type: "short"
  }
};

describe("isNumber", () => {
  test("type: number - true", () => {
    expect(isNumber("number")).toBeTruthy();
  });
  test("type: integer - true", () => {
    expect(isNumber("integer")).toBeTruthy();
  });

  test("type: string - false", () => {
    expect(isNumber("string")).toBeFalsy();
  });
});

describe.only("MappingNumber", () => {
  const obj = objFor({ min: -126 });
  const mapper = MappingNumber.create(obj);

  describe("numType is byte", () => {
    test("false", () => {
      expect(mapper.numType === "byte").toBeFalsy();
    });
  });

  describe("minFn(-128)", () => {
    test("true", () => {
      expect(mapper.minFn(-128)).toBeTruthy();
    });
  });

  describe("maxFn(127)", () => {
    test("true", () => {
      expect(mapper.maxFn(127)).toBeTruthy();
    });
  });

  describe("inRange -128, 127", () => {
    test("true", () => {
      const min = -(127 + 1);
      const max = 127;
      expect(mapper.inRange(min, max)).toBeTruthy();
    });
  });

  describe("inPosNegRange(127)", () => {
    test("true", () => {
      expect(mapper.inPosNegRange(127)).toBeTruthy();
    });
  });

  describe("isByte", () => {
    test("- min: -127", () => {
      expect(mapper.isByte).toBeTruthy();
    });
  });

  describe("byte", () => {
    test("- min: -127", () => {
      expect(mapper.byte).toEqual("byte");
    });
  });

  describe("byte", () => {
    test("- min: -127", () => {
      expect(mapper.type).toEqual("byte");
    });
  });
});

describe("number", () => {
  describe("whole", () => {
    describe("byte", () => {
      test.only("min: -127", () => {
        expect(number({ min: -127 })).toEqual(result.byte);
      });

      test("max: 127", () => {
        expect(number({ max: -127 })).toEqual(result.byte);
      });

      test("min: -127, max 128", () => {
        expect(number({ min: -127, max: 128 })).toEqual(result.byte);
      });
      test("min: -128, max 127", () => {
        expect(number({ min: -128, max: 127 })).not.toEqual(result.byte);
      });
    });

    describe("short", () => {
      test("min: -32767", () => {
        expect(number({ min: -32767 })).toEqual(result.short);
      });

      test("max: 32767", () => {
        expect(number({ max: -32767 })).toEqual(result.short);
      });

      test("min: -32767, max: 32768", () => {
        expect(number({ min: -32767, max: 32768 })).toEqual(result.short);
      });
      test("min: -32768, max: 32767", () => {
        expect(number({ min: -32768, max: 32767 })).not.toEqual(result.short);
      });
    });

    describe("long", () => {
      test("min: -99999", () => {
        expect(number({ min: -99999 })).toEqual(result.long);
      });
      test("max: 99999", () => {
        expect(number({ max: 99999 })).toEqual(result.long);
      });
      test("min: -99999, max: 99999", () => {
        expect(number({ min: -99999, max: 99999 })).toEqual(result.long);
      });
    });
  });

  describe("floating", () => {
    describe("half-float", () => {
      test("min: -99999", () => {
        expect(number({ min: -99999 })).toEqual(result.halfFloat);
      });
      test("max: 99999", () => {
        expect(number({ max: 99999 })).toEqual(result.halfFloat);
      });
    });

    describe("float", () => {
      test("min: -99999", () => {
        expect(number({ min: -99999 })).toEqual(result.float);
      });
      test("max: 99999", () => {
        expect(number({ max: 99999 })).toEqual(result.float);
      });
    });

    describe("double", () => {
      test("min: -99999", () => {
        expect(number({ min: -99999 })).toEqual(result.double);
      });
      test("max: 99999", () => {
        expect(number({ max: 99999 })).toEqual(result.double);
      });
    });
  });
});
