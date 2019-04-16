const { build } = require("..");

describe("number", () => {
  describe("whole", () => {
    describe("byte", () => {
      test("min: -127", () => {});

      test("max: 127", () => {});

      test("min: -127, max 128", () => {});
      test("min: -128, max 127", () => {});
    });

    describe("short", () => {
      test("min: -32767", () => {});

      test("max: 32767", () => {});

      test("min: -32767, max 32767", () => {});
      test("min: -32767, max 32767", () => {});
    });

    describe("long", () => {});
  });

  describe("floating", () => {
    describe("half-float", () => {
      test("min: -99999", () => {});
      test("max: 99999", () => {});
    });

    describe("float", () => {
      test("min: -99999", () => {});
      test("max: 99999", () => {});
    });

    describe("double", () => {
      test("min: -99999", () => {});
      test("max: 99999", () => {});
    });
  });
});
