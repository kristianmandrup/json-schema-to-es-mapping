const { InfoHandler } = require("../info");
const dotProp = require("dot-prop");
const { createRefValidator } = require("./ref-validator");

const createReference = (opts, config) => new Reference(opts, config);

class Reference extends InfoHandler {
  constructor(opts = {}, config = {}) {
    super(config);
    const { schema, reference } = opts;
    this.config = config;
    this.reference = reference;
    this.schema = schema;
    this.visitedPaths = config.visitedPaths || {};
    this.refValidator = createRefValidator(config);
    this.hits = config.hits || {};
    this.wasCacheHit = false;
  }

  get state() {
    return {
      hits: this.hits,
      visitedPaths: this.visitedPaths
    };
  }

  get $config() {
    return {
      ...this.config,
      ...this.state
    };
  }

  get normalizedRef() {
    this.validateRef();
    return this.reference.replace(/^#\//, "");
  }

  referencePathResolvedAndVisited(obj) {
    this.visitedPaths[this.cacheKey] = obj;
  }

  get cacheKey() {
    return this.dotPath;
  }

  get referenceFromCache() {
    const hit = this.visitedPaths[this.cacheKey];
    if (!hit) return;
    this.wasCacheHit = true;
    this.hits[this.reference] = (this.hits[this.reference] || 0) + 1;
    return hit;
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

  validateRef() {
    this.refValidator.validate(this.reference);
  }

  get resolveRefObject() {
    this.validateRef();
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
