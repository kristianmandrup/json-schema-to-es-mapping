const { InfoHandler } = require("../info");
const { isObjectType } = require("../util");

const createSchemaValidator = config => new SchemaValidator(config);

class SchemaValidator extends InfoHandler {
  constructor(config = {}) {
    super(config);
  }

  validate(schema) {
    !schema && this.error("validate", "Missing schema", { schema });
    !isObjectType(schema) &&
      this.error(
        "validate",
        `Invalid schema. Must be an Object, was: ${typeof schema}`
      );
    return true;
  }
}

module.exports = {
  createSchemaValidator,
  SchemaValidator
};
