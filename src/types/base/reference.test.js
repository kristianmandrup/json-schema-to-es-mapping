const { createReferenceResolver } = require("./reference");

const create = createReferenceResolver;

const Project = {
  type: "object",
  properties: {
    title: {
      type: "string"
    }
  }
};
const schema = {
  definitions: {
    Project
  }
};

describe("ReferenceResolver", () => {
  const config = {};
  describe("no reference", () => {
    const opts = {
      schema
    };
    const $reference = create(opts, config);

    const obj = {};

    test("resolves to obj", () => {
      expect($reference.resolve(obj)).toBe(obj);
    });
  });

  describe("no schema", () => {
    const reference = "#/definitions/Project";
    const opts = {
      reference
    };

    const obj = {
      $ref: "#/definitions/Project"
    };

    test("throws", () => {
      expect(() => {
        const $reference = create(opts, config);
        $reference.resolve(obj);
      }).toThrow();
    });
  });

  describe("schema and valid reference", () => {
    const reference = "#/definitions/Project";
    const opts = {
      reference,
      schema
    };
    const $reference = create(opts, config);
    const resolved = Project;
    const obj = {
      $ref: "#/definitions/Project"
    };

    test("throws", () => {
      expect($reference.resolve(obj)).toEqual(resolved);
    });
  });

  describe("schema and invalid reference", () => {
    const reference = "#/definitions/Unknown";
    const opts = {
      schema
    };
    const $reference = create(opts, config);
    const obj = {
      $ref: reference
    };

    test("throws", () => {
      expect(() => $reference.resolve(obj)).toThrow();
    });
  });
});
