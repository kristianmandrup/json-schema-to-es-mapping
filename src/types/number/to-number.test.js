const { isNumber, toNumber, MappingNumber } = require(".");

const create = opts => ({
  type: "number",
  ...opts
});

const INT_MAX = Math.pow(2, 31);
const NEG_INT_MAX = -(INT_MAX + 1);

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

describe("MappingNumber", () => {
  describe("min: -127", () => {
    const obj = objFor({ min: -127 });
    const mapper = MappingNumber.create(obj);

    describe("numType", () => {
      test("is not byte", () => {
        expect(mapper.numType === "byte").toBeFalsy();
      });
    });

    describe("minFn(-128)", () => {
      test("true", () => {
        expect(mapper.minFn(-128)).toBeTruthy();
      });
    });

    describe("maxExcl", () => {
      test("is INT_MAX", () => {
        expect(mapper.maxExcl).toBe(INT_MAX - 1);
      });
    });

    describe("minExcl", () => {
      test("is 0", () => {
        expect(mapper.minExcl).toBe(-INT_MAX);
      });
    });

    describe("maxFn(127)", () => {
      test("true", () => {
        expect(mapper.maxFn(127)).toBeFalsy();
      });
    });

    describe("inMaxRangeIncl(127)", () => {
      test("false", () => {
        expect(mapper.inMaxRangeIncl(127)).toBeFalsy();
      });
    });

    describe("inRange -128, 127", () => {
      test("false", () => {
        const min = -(127 + 1);
        const max = 127;
        expect(mapper.inRange(min, max)).toBeFalsy();
      });
    });

    describe("inPosNegRange(127)", () => {
      test("false", () => {
        expect(mapper.inPosNegRange(127)).toBeFalsy();
      });
    });

    describe("isByte", () => {
      test("false", () => {
        expect(mapper.isByte).toBeFalsy();
      });
    });

    describe("byte", () => {
      test("is false", () => {
        expect(mapper.byte).toBeFalsy();
      });
    });

    describe("configType", () => {
      test("is undefined", () => {
        expect(mapper.configType).toBeUndefined();
      });
    });

    describe("formatType", () => {
      test("is undefined", () => {
        expect(mapper.formatType).toBeUndefined();
      });
    });

    describe("calcNumericType", () => {
      test("is byte", () => {
        expect(mapper.calcNumericType).toEqual("integer");
      });
    });
    describe("baseType", () => {
      test("is float", () => {
        expect(mapper.baseType).toEqual("float");
      });
    });
  });

  describe("max: 128", () => {
    const obj = objFor({ max: 128 });
    const mapper = MappingNumber.create(obj);

    describe("minFn(-128)", () => {
      test("true", () => {
        expect(mapper.minFn(-128)).toBeFalsy();
      });
    });

    describe("maxFn(127)", () => {
      test("false", () => {
        expect(mapper.maxFn(127)).toBeFalsy();
      });
    });

    describe("inMaxRangeIncl(127)", () => {
      test("false", () => {
        expect(mapper.inMaxRangeIncl(127)).toBeFalsy();
      });
    });

    describe("inRange -128, 127", () => {
      test("false", () => {
        const min = -(127 + 1);
        const max = 127;
        expect(mapper.inRange(min, max)).toBeFalsy();
      });
    });

    describe("inPosNegRange(127)", () => {
      test("false", () => {
        expect(mapper.inPosNegRange(127)).toBeFalsy();
      });
    });

    describe("isByte", () => {
      test("false", () => {
        expect(mapper.isByte).toBeFalsy();
      });
    });

    describe("type", () => {
      test("not a byte", () => {
        expect(mapper.type).not.toEqual("byte");
      });
    });
  });

  describe("min: -127, max: 127", () => {
    const obj = objFor({ min: -127, max: 127 });
    const mapper = MappingNumber.create(obj);

    describe("minFn(-128)", () => {
      test("true", () => {
        expect(mapper.minFn(-128)).toBeTruthy();
      });
    });

    describe("maxFn(127)", () => {
      test("false", () => {
        expect(mapper.maxFn(127)).toBeTruthy();
      });
    });

    describe("inMaxRangeIncl(127)", () => {
      test("true", () => {
        expect(mapper.inMaxRangeIncl(127)).toBeTruthy();
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
      test("true", () => {
        expect(mapper.isByte).toBeTruthy();
      });
    });

    describe("type", () => {
      test("is a byte", () => {
        expect(mapper.type).toEqual("byte");
      });
    });
  });

  describe("min: INT_MAX - 2", () => {
    const obj = objFor({ min: INT_MAX - 2 });
    const mapper = MappingNumber.create(obj);

    describe("minFn(NEG_INT_MAX)", () => {
      test("true", () => {
        expect(mapper.minFn(NEG_INT_MAX)).toBeTruthy();
      });
    });

    describe("maxFn(INT_MAX)", () => {
      test("false", () => {
        expect(mapper.maxFn(INT_MAX)).toBeTruthy();
      });
    });

    describe("inMaxRangeIncl(INT_MAX)", () => {
      test("true", () => {
        expect(mapper.inMaxRangeIncl(INT_MAX)).toBeTruthy();
      });
    });

    describe("inRange NEG_INT_MAX, INT_MAX", () => {
      test("true", () => {
        const min = NEG_INT_MAX;
        const max = INT_MAX;
        expect(mapper.inRange(min, max)).toBeTruthy();
      });
    });

    describe("inPosNegRange(INT_MAX)", () => {
      test("true", () => {
        expect(mapper.inPosNegRange(INT_MAX)).toBeTruthy();
      });
    });

    describe("isInteger", () => {
      test("true", () => {
        expect(mapper.isInteger).toBeTruthy();
      });
    });

    describe("type", () => {
      test("is a byte", () => {
        expect(mapper.type).toEqual("integer");
      });
    });
  });
});
