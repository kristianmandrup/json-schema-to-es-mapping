// for resolving a type definition reference
const { isStringType, isObjectType, stringify } = require("../util");
const { InfoHandler } = require("../info");
const { createReference } = require("./reference");

const createDefinitionRefResolver = (opts = {}) => {
  return new DefinitionRefResolver(opts);
};

class DefinitionRefResolver extends InfoHandler {
  constructor({ schema }, config = {}) {
    super(config);
    this.validateSchema(schema);
    this.schema = schema;
    this.visitedPaths = config.visitedPaths || {};
  }

  validateSchema(schema) {
    !schema && this.error("validate", "Missing schema");
    !isObjectType(schema) &&
      this.error(
        "validate",
        `Invalid schema. Must be an Object, was: ${typeof schema}`
      );
    return true;
  }

  validateRef(reference) {
    !reference && this.error("validate", "Missing reference");
    !isStringType(reference) &&
      this.error(
        "validate",
        `Reference invalid. Must be a string, was: ${typeof reference}`,
        {
          reference
        }
      );
    return true;
  }

  refObjectFor(reference) {
    this.validateRef(reference);
    this.ref = createReference(reference);
    return this.ref.refObject;
  }
}

module.exports = {
  createDefinitionRefResolver,
  DefinitionRefResolver
};
