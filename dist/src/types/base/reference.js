"use strict";
var isFunction = require("../util").isFunction;
var createDefinitionRefResolver = require("../reference").createDefinitionRefResolver;
var createReferenceResolver = function (opts, config) {
    return new ReferenceResolver(opts, config);
};
var ReferenceResolver = /** @class */ (function () {
    function ReferenceResolver(opts, config) {
        if (config === void 0) { config = {}; }
        var defResolverInst = createDefinitionRefResolver(opts, config);
        this.refResolver =
            config.refResolver || defResolverInst.refObjectFor.bind(defResolverInst);
    }
    // resolve using defintion ref
    ReferenceResolver.prototype.resolve = function (obj) {
        if (!obj.$ref)
            return obj;
        var refResolver = this.refResolver;
        if (!isFunction(refResolver)) {
            this.error("Invalid refResolver, must be a function, was " + typeof refResolver, {
                refResolver: refResolver
            });
        }
        var reference = obj.$ref;
        var resolved = refResolver(reference);
        this.wasCacheHit = resolved.wasCacheHit;
        return resolved;
    };
    return ReferenceResolver;
}());
module.exports = {
    createReferenceResolver: createReferenceResolver,
    ReferenceResolver: ReferenceResolver
};
//# sourceMappingURL=reference.js.map