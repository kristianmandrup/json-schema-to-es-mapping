const { build } = require("../..");

const create = ({ min, max }) => ({
  type: "object",
  properties: {
    timestamp: {
      min,
      max
    }
  }
});

describe("date range", () => {
  describe("only min, no max", () => {
    json = create({ min: "1-1-2014" });
    const { properties } = build(json);
    test("date_range", () => {
      expec(properties.timestamp).toEqual({});
    });
  });
  describe("only max, no min", () => {
    json = create({ max: "1-1-2018" });
    const { properties } = build(json);
    test("date_range", () => {
      expec(properties.timestamp).toEqual({});
    });
  });

  describe("min and max", () => {
    json = create({ min: "1-1-2014", max: "1-1-2018" });
    const { properties } = build(json);
    test("date_range", () => {
      expec(properties.timestamp).toEqual({});
    });
  });
});
