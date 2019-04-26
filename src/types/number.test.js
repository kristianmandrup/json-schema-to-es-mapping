const { build } = require("..");

const create = opts => ({
  type: "object",
  properties: {
    votes: {
      type: "number",
      ...opts
    }
  }
});

const INT_MAX = Math.pow(2, 31);
const NEG_INT_MAX = -(INT_MAX + 1);

const config = {};

const number = opts => {
  const schema = create(opts);
  const obj = build(schema, config);
  return obj.properties.votes;
};

const result = {
  byte: {
    type: "byte"
  },
  short: {
    type: "short"
  },
  long: {
    type: "long"
  },
  halfFloat: {
    type: "half_float"
  },
  float: {
    type: "float"
  },
  double: {
    type: "double"
  },
  integer: {
    type: "integer"
  }
};
describe("number", () => {
  describe("whole", () => {
    describe("byte", () => {
      test("min: -127, max: 127 - a byte", () => {
        expect(number({ min: -127, max: 127 })).toEqual(result.byte);
      });

      test("min: -127, max: 128 - not byte", () => {
        expect(number({ min: -127, max: 128 })).not.toEqual(result.byte);
      });

      test("max: 127 - not byte", () => {
        expect(number({ max: 127 })).not.toEqual(result.byte);
      });

      test("min: -128 - not byte", () => {
        expect(number({ min: -128 })).not.toEqual(result.byte);
      });

      test("min: -127, max 128 - short", () => {
        expect(number({ min: -127, max: 128 })).toEqual(result.short);
      });
      test("min: INT_MAX - integer", () => {
        expect(number({ min: INT_MAX })).toEqual(result.integer);
      });

      test("min: INT_MAX-1 - long", () => {
        expect(number({ min: NEG_INT_MAX - 1 })).toEqual(result.long);
      });
    });
  });

  describe("floating", () => {
    describe("half-float", () => {
      test("min: -99999", () => {
        expect(
          number({ min: -99999, multipleOf: 0.1, numType: "half-float" })
        ).toEqual(result.halfFloat);
      });
      test("max: 99999", () => {
        expect(
          number({ max: 99999, multipleOf: 0.1, numType: "half-float" })
        ).toEqual(result.halfFloat);
      });
    });

    describe("float", () => {
      test("min: -99999", () => {
        expect(number({ min: -99999, multipleOf: 0.1 })).toEqual(result.float);
      });
      test("max: 99999", () => {
        expect(number({ max: 99999, multipleOf: 0.1 })).toEqual(result.float);
      });
    });

    describe("double", () => {
      test("min: -99999", () => {
        expect(
          number({ min: -99999, multipleOf: 0.1, numType: "double" })
        ).toEqual(result.double);
      });
      test("max: 99999", () => {
        expect(
          number({ max: 99999, multipleOf: 0.1, numType: "double" })
        ).toEqual(result.double);
      });
    });
  });
});
