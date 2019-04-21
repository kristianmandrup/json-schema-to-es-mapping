const { createReference } = require("./definition-ref");

const carRef = "#/definitions/car";
const driverRef = "#/definitions/driver";

describe("Reference", () => {
  const schema = {
    type: "object",
    properties: {
      car: {
        $ref: "#/definitions/car"
      }
    },
    definitions: {
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
    }
  };
  const config = {};
  const opts = { schema, reference };
  const ref = createReference(opts, config);
  describe("car ref resolved", () => {
    const obj = ref.resolveRefObject();

    test("car ref resolved to car object def", () => {
      expect(obj).toEqual(expected);
    });
  });
});

describe("Multi Reference", () => {
  const multiRefSchema = {
    type: "object",
    properties: {
      cars: {
        type: "array",
        items: {
          $ref: "#/definitions/car"
        }
      }
    },
    definitions: {
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
            cars: {
              type: "array",
              items: {
                $ref: "#/definitions/car"
              }
            }
          }
        }
      }
    }
  };

  const config = {};
  const opts = { schema: multiRefSchema, reference };
  const ref = createReference(opts, config);

  describe("circular resolved via cache", () => {
    const obj = ref.resolveRefObject();

    test("is ", () => {
      expect(obj).toEqual(expected);
    });
  });
});
