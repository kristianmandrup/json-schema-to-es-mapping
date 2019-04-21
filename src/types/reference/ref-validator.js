const { InfoHandler } = require("../info");
const { isStringType, isObjectType } = require("../util");

const createRefValidator = config => new RefValidator(config);

class RefValidator extends InfoHandler {
  constructor(config = {}) {
    super(config);
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
}

module.exports = {
  createRefValidator,
  RefValidator
};
