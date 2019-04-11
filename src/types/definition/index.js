// for resolving a type definition reference
const dotProp = require("dot-prop");
const { classify } = require("../util");
const { MappingBaseType } = require("../base");

const createDefinitionRefResolver = (opts = {}) => {
  return new DefinitionRefResolver(opts);
};

function stringify(obj) {
  return JSON.stringify(obj, null, 2);
}

class DefinitionRefResolver extends MappingBaseType {
  constructor({ reference, schema, config = {} }) {
    super(config);
    this.reference = reference;
    this.schema = schema || {};
    // this.validate();
  }

  validate() {
    !this.schema && this.error("validate", "Missing schema");
    !this.reference && this.error("validate", "Missing reference");
    return true;
  }

  get normalizedRef() {
    return this.reference.replace(/^#\//, "");
  }

  get refName() {
    const paths = this.normalizedRef.split("/");
    return paths[paths.length - 1];
  }

  get dotPath() {
    return this.normalizedRef.replace("/", ".");
  }

  get refObject() {
    this._refObject = this._refObject || this.resolveRefObject();
    return this._refObject;
  }

  resolveRefObject(reference) {
    this.reference = reference;
    this.validate();
    const found = dotProp.has(this.schema, this.dotPath);
    !found &&
      this.error(
        "resolveRefObject",
        `No value found in schema at: ${this.dotPath} - ${stringify(
          this.schema
        )}`
      );
    const obj = dotProp.get(this.schema, this.dotPath);
    !typeof obj === "object" &&
      this.error(
        "resolveRefObject",
        `No object value found at: ${this.dotPath} - - ${stringify(
          this.schema
        )}`
      );
    return obj;
  }

  get name() {
    return (this.refObject && this.refObject.name) || this.refName;
  }

  get typeName() {
    return classify(this.name, "_", true);
  }
}

module.exports = {
  createDefinitionRefResolver,
  DefinitionRefResolver
};
