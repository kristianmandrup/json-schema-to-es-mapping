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
  describe("no reference", () => {});
  describe("no reference", () => {
    const opts = {
      schema
    };
    const reference = create(opts, config);

    const resolved = Project;
    const obj = {
      $ref: "#/definitions/Project"
    };

    test("has typeName", () => {
      expect(reference.resolve(obj)).toEqual(resolved);
    });
  });
});
