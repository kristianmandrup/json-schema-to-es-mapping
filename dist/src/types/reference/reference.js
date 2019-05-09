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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var InfoHandler = require("../info").InfoHandler;
var dotProp = require("dot-prop");
var createRefValidator = require("./ref-validator").createRefValidator;
var createReference = function (opts, config) { return new Reference(opts, config); };
var Reference = /** @class */ (function (_super) {
    __extends(Reference, _super);
    function Reference(opts, config) {
        if (opts === void 0) { opts = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        var schema = opts.schema, reference = opts.reference;
        _this.config = config;
        _this.reference = reference;
        _this.schema = schema;
        _this.visitedPaths = config.visitedPaths || {};
        _this.refValidator = createRefValidator(config);
        _this.hits = config.hits || {};
        _this.wasCacheHit = false;
        return _this;
    }
    Object.defineProperty(Reference.prototype, "state", {
        get: function () {
            return {
                hits: this.hits,
                visitedPaths: this.visitedPaths
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "$config", {
        get: function () {
            return __assign({}, this.config, this.state);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "normalizedRef", {
        get: function () {
            this.validateRef();
            return this.reference.replace(/^#\//, "");
        },
        enumerable: true,
        configurable: true
    });
    Reference.prototype.referencePathResolvedAndVisited = function (obj) {
        this.visitedPaths[this.cacheKey] = obj;
    };
    Object.defineProperty(Reference.prototype, "cacheKey", {
        get: function () {
            return this.dotPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "referenceFromCache", {
        get: function () {
            var hit = this.visitedPaths[this.cacheKey];
            if (!hit)
                return;
            this.wasCacheHit = true;
            this.hits[this.reference] = (this.hits[this.reference] || 0) + 1;
            return hit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "name", {
        get: function () {
            return (this.refObject && this.refObject.name) || this.refName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "typeName", {
        get: function () {
            return classify(this.name, "_", true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "refName", {
        get: function () {
            var paths = this.normalizedRef.split("/");
            return paths[paths.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "dotPath", {
        get: function () {
            return this.normalizedRef.replace("/", ".");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "refObject", {
        get: function () {
            this._refObject = this._refObject || this.resolvedRefObject;
            return this._refObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Reference.prototype, "resolvedRefObject", {
        get: function () {
            return this.referenceFromCache || this.resolveRefObject;
        },
        enumerable: true,
        configurable: true
    });
    Reference.prototype.validateRef = function () {
        this.refValidator.validate(this.reference);
    };
    Object.defineProperty(Reference.prototype, "resolveRefObject", {
        get: function () {
            this.validateRef();
            this.handleFoundReference();
            var obj = dotProp.get(this.schema, this.dotPath);
            this.referenceNotAnObject(obj);
            this.referencePathResolvedAndVisited(obj);
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    Reference.prototype.handleFoundReference = function () {
        var found = dotProp.has(this.schema, this.dotPath);
        if (found)
            return;
        this.error("resolveRefObject", "No value found in schema at: " + this.dotPath + " - " + stringify(this.schema));
    };
    Reference.prototype.referenceNotAnObject = function (obj) {
        !typeof obj === "object" &&
            this.error("resolveRefObject", "No object value found at: " + this.dotPath + " - - " + stringify(this.schema));
    };
    return Reference;
}(InfoHandler));
module.exports = {
    createReference: createReference,
    Reference: Reference
};
//# sourceMappingURL=reference.js.map