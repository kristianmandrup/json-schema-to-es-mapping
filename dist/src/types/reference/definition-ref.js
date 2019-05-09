"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// for resolving a type definition reference
var InfoHandler = require("../info").InfoHandler;
var createReference = require("./reference").createReference;
var createRefValidator = require("./ref-validator").createRefValidator;
var createSchemaValidator = require("./schema-validator").createSchemaValidator;
var createDefinitionRefResolver = function (opts, config) {
    if (opts === void 0) { opts = {}; }
    return new DefinitionRefResolver(opts, config);
};
var DefinitionRefResolver = /** @class */ (function (_super) {
    __extends(DefinitionRefResolver, _super);
    function DefinitionRefResolver(opts, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        var schema = opts.schema;
        _this.schemaValidator = createSchemaValidator(config);
        _this.refValidator = createRefValidator(config);
        _this.visitedPaths = config.visitedPaths || {};
        var $schema = schema || config.schema;
        _this.schema = $schema;
        return _this;
    }
    Object.defineProperty(DefinitionRefResolver.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        set: function (schema) {
            this.validateSchema(schema);
            this._schema = schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinitionRefResolver.prototype, "wasCacheHit", {
        get: function () {
            if (!this.ref) {
                this.error("wasCacheHit", "No reference has been resolved. Call refObjectFor(reference)");
            }
            return this.ref.wasCacheHit;
        },
        enumerable: true,
        configurable: true
    });
    DefinitionRefResolver.prototype.refObjectFor = function (reference) {
        this.validateRef(reference);
        this.ref = createReference({ reference: reference, schema: this.schema }, this.config);
        return this.ref.refObject;
    };
    DefinitionRefResolver.prototype.validateSchema = function (schema) {
        this.schemaValidator.validate(schema);
    };
    DefinitionRefResolver.prototype.validateRef = function (ref) {
        this.refValidator.validate(ref);
    };
    return DefinitionRefResolver;
}(InfoHandler));
module.exports = {
    createDefinitionRefResolver: createDefinitionRefResolver,
    DefinitionRefResolver: DefinitionRefResolver
};
//# sourceMappingURL=definition-ref.js.map