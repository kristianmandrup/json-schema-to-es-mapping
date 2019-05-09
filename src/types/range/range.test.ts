const { MappingRange } = require(".");
const schema = {};
const config = {
  schema,
  logging: true
};

class MyRange extends MappingRange {
  get typeName() {
    return "range";
  }
}

const key = "level";

const create = opts =>
  new MyRange({ value: { type: "number", ...opts }, key, config });

describe("MappingRange", () => {
  describe("minIncl, maxIncl", () => {
    const range = create({ minimum: 1, maximum: 3 });
    test("minimum", () => {
      expect(range.minimum).toBe(1);
    });

    test("maximum", () => {
      expect(range.maximum).toBe(3);
    });

    test("exclusiveMinimum", () => {
      expect(range.exclusiveMinimum).toBeUndefined();
    });

    test("exclusiveMaximum", () => {
      expect(range.exclusiveMaximum).toBeUndefined();
    });

    test("inMinRangeIncl", () => {
      expect(range.inMinRangeIncl(3)).toBeFalsy();
    });

    test("inMaxRangeIncl", () => {
      expect(range.inMaxRangeIncl(3)).toBeTruthy();
    });

    test("inMaxRangeExcl", () => {
      expect(range.inMaxRangeExcl(3)).toBeFalsy();
    });

    test("inMinRangeExcl", () => {
      expect(range.inMinRangeExcl(3)).toBeFalsy();
    });

    test("minFn", () => {
      expect(range.minFn(3)).toBeFalsy();
    });

    test("maxFn", () => {
      expect(range.maxFn(3)).toBeTruthy();
    });
  });

  describe("minExcl, maxIncl", () => {
    const range = create({ exclusiveMinimum: 1, maximum: 3 });
    test("minimum", () => {
      expect(range.minimum).toBeUndefined();
    });

    test("maximum", () => {
      expect(range.maximum).toBe(3);
    });

    test("exclusiveMinimum", () => {
      expect(range.exclusiveMinimum).toBe(1);
    });
    test("exclusiveMaximum", () => {
      expect(range.exclusiveMaximum).toBeUndefined();
    });
  });

  describe("minIncl, maxExcl", () => {
    const range = create({ minimum: 1, exclusiveMaximum: 3 });

    test("minimum", () => {
      expect(range.minimum).toBe(1);
    });

    test("maximum", () => {
      expect(range.maximum).toBeUndefined();
    });

    test("exclusiveMinimum", () => {
      expect(range.exclusiveMinimum).toBeUndefined();
    });

    test("exclusiveMaximum", () => {
      expect(range.exclusiveMaximum).toEqual(3);
    });
  });

  describe("minExcl, maxExcl", () => {
    const range = create({ exclusiveMinimum: 1, exclusiveMaximum: 3 });
    test("minimum", () => {
      expect(range.minimum).toBeUndefined();
    });

    test("maximum", () => {
      expect(range.maximum).toBeUndefined();
    });

    test("exclusiveMinimum", () => {
      expect(range.exclusiveMinimum).toBe(1);
    });
    test("exclusiveMaximum", () => {
      expect(range.exclusiveMaximum).toEqual(3);
    });
  });
});
