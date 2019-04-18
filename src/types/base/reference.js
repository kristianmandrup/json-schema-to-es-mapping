const { isFunction } = require("util");
const { createDefinitionRefResolver } = require("../definition");
const createReferenceResolver = config => new ReferenceResolver(config);

class ReferenceResolver {
  constructor(opts) {
    const defResolverInst = createDefinitionRefResolver(opts);
    this.definitionResolver =
      config.definitionResolver ||
      defResolverInst.resolveRefObject.bind(defResolverInst);
  }

  // resolve using defintion ref
  resolveValueObject(obj) {
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
    return definitionResolver(obj);
  }
}

module.exports = {
  createReferenceResolver,
  ReferenceResolver
};
