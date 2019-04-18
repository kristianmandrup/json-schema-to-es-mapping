// for resolving a type definition reference
const dotProp = require("dot-prop");
const { classify } = require("../util");
const { InfoHandler } = require("../info");

const createDefinitionRefResolver = (opts = {}) => {
  return new DefinitionRefResolver(opts);
};

function stringify(obj) {
  return JSON.stringify(obj, null, 2);
}

class DefinitionRefResolver extends InfoHandler {
  constructor({ reference, schema, config = {} }) {
    super(config);
    this.reference = reference;
    this.schema = schema || {};
    this.visitedPaths = config.visitedPaths || {};
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
    this._refObject = this._refObject || this.resolvedRefObject;
    return this._refObject;
  }

  get resolvedRefObject() {
    return this.referenceFromCache || this.resolveRefObject();
  }

  resolveRefObject(reference) {
    this.reference = reference || this.reference;
    this.validate();
    this.handleFoundReference();

    const obj = dotProp.get(this.schema, this.dotPath);
    this.referenceNotAnObject(obj);
    this.referencePathResolvedAndVisited(obj);
    return obj;
  }

  handleFoundReference() {
    const found = dotProp.has(this.schema, this.dotPath);
    if (found) return;
    this.error(
      "resolveRefObject",
      `No value found in schema at: ${this.dotPath} - ${stringify(this.schema)}`
    );
  }

  referenceNotAnObject(obj) {
    !typeof obj === "object" &&
      this.error(
        "resolveRefObject",
        `No object value found at: ${this.dotPath} - - ${stringify(
          this.schema
        )}`
      );
  }

  referencePathResolvedAndVisited(obj) {
    this.visitedPaths[this.dotPath] = obj;
  }

  get referenceFromCache() {
    return this.visitedPaths[thisjest.dotPath];
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
