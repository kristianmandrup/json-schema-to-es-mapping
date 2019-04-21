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

const config = {};

const number = opts => {
  const schema = create(opts);
  const obj = build(schema, config);
  return obj;
};

const result = {
  byte: {
    type: "byte"
  },
  shirt: {
    type: "short"
  }
};

describe("number", () => {
  describe("whole", () => {
    describe("byte", () => {
      test("min: -127", () => {
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
