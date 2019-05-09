import { MappingBaseType } from "./base";

class MyType extends MappingBaseType {
  constructor(opts, config) {
    super(opts, config);
  }

  get typeName() {
    return "my-type";
  }
}

const create = (opts, config) => {
  opts.config = config;
  return new MyType(opts, config);
};

const reference = "#/definitions/car";
const schema = {
  definitions: {
    car: {
      type: "object",
      name: "superCar",
      properties: {}
    }
  }
};

describe("definitionResolver", () => {
  const config = {};
  describe.only("set on config", () => {
    const definitionResolver = () => 42;
    const config = {
      definitionResolver
    };
    const value = {
      $ref: reference
    };
    const opts = {
      schema,
      key: "person",
      value
    };
    const mapper = create(opts, config);

    test("is one from config", () => {
      expect(mapper.referenceResolver).toBe(definitionResolver);
    });
  });
  describe("default", () => {
    const value = {
      $ref: reference
    };
    const opts = {
      schema,
      key: "person",
      value
    };

    const mapper = create(opts, config);

    test("is set", () => {
      expect(mapper.referenceResolver).toBeDefined();
    });
  });
});
