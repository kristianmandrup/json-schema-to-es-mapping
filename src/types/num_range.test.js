const { build } = require("..");

const create = ({ min, max }) => ({
  type: "object",
  properties: {
    count: {
      type: "number",
      min,
      max
    }
  }
});

describe("numeric range", () => {
  describe("integer", () => {
    describe("only max, no min", () => {
      json = create({ max: 1000 });
      const { properties } = build(json);
      const { count } = properties || {};
      test("integer_range", () => {
        expect(count).toEqual({
          type: "float"
        });
      });
    });

    describe("only min, no max", () => {
      json = create({ min: 1 });
      const { properties } = build(json);
      const { count } = properties || {};
      test("integer_range", () => {
        expect(count).toEqual({
          type: "float"
        });
      });
    });

    describe("min and max", () => {});
  });

  describe("long", () => {
    describe("only max, no min", () => {});

    describe("only min, no max", () => {});

    describe("min and max", () => {});
  });

  describe("float", () => {
    describe("only max, no min", () => {});

    describe("only min, no max", () => {});

    describe("min and max", () => {});
  });

  describe("double", () => {
    describe("only max, no min", () => {});

    describe("only min, no max", () => {});

    describe("min and max", () => {});
  });
});
