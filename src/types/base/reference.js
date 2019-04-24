const { isFunction } = require("../util");
const { createDefinitionRefResolver } = require("../reference");
const createReferenceResolver = (opts, config) =>
  new ReferenceResolver(opts, config);

class ReferenceResolver {
  constructor(opts, config = {}) {
    const defResolverInst = createDefinitionRefResolver(opts, config);
    this.refResolver =
      config.refResolver || defResolverInst.refObjectFor.bind(defResolverInst);
  }

  // resolve using defintion ref
  resolve(obj) {
    if (!obj.$ref) return obj;
    const { refResolver } = this;
    if (!isFunction(refResolver)) {
      this.error(
        `Invalid refResolver, must be a function, was ${typeof refResolver}`,
        {
          refResolver
        }
      );
    }
    const reference = obj.$ref;
    const resolved = refResolver(reference);
    this.wasCacheHit = resolved.wasCacheHit;
    return resolved;
  }
}

module.exports = {
  createReferenceResolver,
  ReferenceResolver
};
