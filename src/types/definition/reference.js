const dotProp = require("dot-prop");

const createReference = (reference, config) => new Reference(reference, config);

class Reference {
  constructor(reference, config = {}) {
    this.config = config;
    this.reference = reference;
    this.visitedPaths = config.visitedPaths || {};
  }

  get normalizedRef() {
    this.validate();
    return this.reference.replace(/^#\//, "");
  }

  referencePathResolvedAndVisited(obj) {
    this.visitedPaths[this.dotPath] = obj;
  }

  get referenceFromCache() {
    return this.visitedPaths[this.dotPath];
  }

  get name() {
    return (this.refObject && this.refObject.name) || this.refName;
  }

  get typeName() {
    return classify(this.name, "_", true);
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
    return this.referenceFromCache || this.resolveRefObject;
  }

  get resolveRefObject() {
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
}

module.exports = {
  createReference,
  Reference
};
