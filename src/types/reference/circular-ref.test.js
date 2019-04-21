const { createReference } = require("./reference");

const refs = {
  car: "#/definitions/car",
  driver: "#/definitions/driver"
};

const resolved = {
  car: {
    type: "object",
    name: "superCar",
    properties: {
      ownedBy: {
        $ref: "#/definitions/driver"
      }
    }
  },
  driver: {
    type: "object",
    name: "superCar",
    properties: {
      owns: {
        car: {
          $ref: "#/definitions/car"
        }
      }
    }
  }
};

describe("Reference", () => {
  const schema = {
    type: "object",
    properties: {
      car: {
        $ref: "#/definitions/car"
      }
    },
    definitions: {
      car: resolved.car,
      driver: resolved.driver
    }
  };
  const config = {
    logging: true
  };

  const run = name => {
    const reference = refs[name];
    const opts = { schema, reference };
    const ref = createReference(opts, config);

    const obj = ref.resolveRefObject;
    const expected = resolved[name];
    return [obj, expected];
  };

  describe("car ref", () => {
    const { obj, expected } = run("car");

    test("resolved to car object def", () => {
      expect(obj).toEqual(expected);
    });
  });
  describe("driver ref", () => {
    const [obj, expected] = run("driver");
    test("resolved to driver", () => {
      expect(obj).toEqual(expected);
    });
  });

  describe("driver, car, then driver ref again", () => {
    const [driverObj, driver] = run("driver");
    const [carObj, car] = run("car");

    const [driverAgainObj, driverAgain] = run("driver");
    test("resolved to driver", () => {
      expect(driverObj).toBe(driverAgainObj);
    });
  });
});
