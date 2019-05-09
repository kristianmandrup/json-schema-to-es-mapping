import { isFunction } from "../util";
import { createDefinitionRefResolver } from "../reference";
import { InfoHandler } from "../info";
export const createReferenceResolver = (opts, config) =>
  new ReferenceResolver(opts, config);

export class ReferenceResolver extends InfoHandler {
  refResolver: any; // IRefResolver
  wasCacheHit: boolean;

  constructor(opts, config: any = {}) {
    super(config);
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
        "resolve",
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
