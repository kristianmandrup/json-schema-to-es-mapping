const { isFunction } = require("../util");
const { createDefinitionRefResolver } = require("../reference");
const createReferenceResolver = (opts, config) =>
  new ReferenceResolver(opts, config);

class ReferenceResolver {
  constructor(opts, config = {}) {
    const defResolverInst = createDefinitionRefResolver(opts, config);
    this.definitionResolver =
      config.definitionResolver ||
      defResolverInst.refObjectFor.bind(defResolverInst);
  }

  // resolve using defintion ref
  resolve(obj) {
    if (!obj.$ref) return obj;
    const { definitionResolver } = this;
    if (!isFunction(definitionResolver)) {
      this.error(
        `Invalid definitionResolver, must be a function, was ${typeof definitionResolver}`,
        {
          definitionResolver
        }
      );
    }
    const reference = obj.$ref;
    const resolved = definitionResolver(reference);
    this.wasCacheHit = resolved.wasCacheHit;
    return resolved;
  }
}

module.exports = {
  createReferenceResolver,
  ReferenceResolver
};
