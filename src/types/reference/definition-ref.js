// for resolving a type definition reference
const { InfoHandler } = require("../info");
const { createReference } = require("./reference");
const { createRefValidator } = require("./ref-validator");
const { createSchemaValidator } = require("./schema-validator");

const createDefinitionRefResolver = (opts = {}) => {
  return new DefinitionRefResolver(opts);
};

class DefinitionRefResolver extends InfoHandler {
  constructor({ schema }, config = {}) {
    super(config);
    this.schemaValidator = createSchemaValidator(config);
    this.refValidator = createRefValidator(config);
    this.visitedPaths = config.visitedPaths || {};
    this.schema = schema;
  }

  set schema(schema) {
    this.validateSchema(schema);
    this._schema = schema;
  }

  get schema() {
    return this._schema;
  }

  get wasCacheHit() {
    if (!this.ref) {
      this.error(
        "wasCacheHit",
        "No reference has been resolved. Call refObjectFor(reference)"
      );
    }
    return this.ref.wasCacheHit;
  }

  refObjectFor(reference) {
    this.validateRef(reference);
    this.ref = createReference(reference);
    return this.ref.refObject;
  }

  validateSchema(schema) {
    this.schemaValidator.validate(schema);
  }

  validateRef(ref) {
    this.refValidator.validate(ref);
  }
}

module.exports = {
  createDefinitionRefResolver,
  DefinitionRefResolver
};
