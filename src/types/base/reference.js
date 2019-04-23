const { isFunction } = require("../util");
const { createDefinitionRefResolver } = require("../definition");
const createReferenceResolver = config => new ReferenceResolver(config);

class ReferenceResolver {
  constructor(opts, config = {}) {
    const { schema } = opts;
    const defResolverInst = createDefinitionRefResolver({ schema }, config);
    this.definitionResolver =
      config.definitionResolver ||
      defResolverInst.resolveRefObject.bind(defResolverInst);
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
