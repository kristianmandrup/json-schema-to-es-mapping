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
var _a = require("../../util"), isObjectType = _a.isObjectType, isStringType = _a.isStringType;
var _b = require("../result"), createKeyMaker = _b.createKeyMaker, createResultHandler = _b.createResultHandler;
var createDispatcher = require("../dispatcher").createDispatcher;
var createReferenceResolver = require("../reference").createReferenceResolver;
var createTypeHandler = require("../type-handler").createTypeHandler;
var createEntryObj = require("../entry").createEntryObj;
var InfoHandler = require("../../info").InfoHandler;
var createComposer = function (opts, config) { return new Composer(opts, config); };
var Composer = /** @class */ (function (_super) {
    __extends(Composer, _super);
    function Composer(opts, config) {
        if (opts === void 0) { opts = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        var key = opts.key, parentName = opts.parentName, value = opts.value, type = opts.type, entry = opts.entry, schema = opts.schema, target = opts.target;
        _this.opts = opts;
        _this.key = key;
        _this.value = value;
        _this.type = type;
        _this.config = opts.config || config;
        _this.schema = schema || _this.config.schema || config.schema;
        _this.parentName = parentName;
        _this.target = target;
        _this.entry = entry;
        return _this;
    }
    Object.defineProperty(Composer.prototype, "ctx", {
        get: function () {
            return {
                opts: this.opts,
                config: this.config
            };
        },
        enumerable: true,
        configurable: true
    });
    Composer.prototype.validateInit = function () {
        var _a = this, opts = _a.opts, key = _a.key, value = _a.value;
        if (!isObjectType(value)) {
            this.error("validateInit", "Missing or invalid value", { opts: opts, value: value });
        }
        if (!isStringType(key)) {
            this.error("validateInit", "Missing or invalid key", { opts: opts, key: key });
        }
        this.validateSchema();
        return this;
    };
    Composer.prototype.validateSchema = function (schema) {
        schema = schema || this.schema;
        if (!isObjectType(schema)) {
            this.error("validateInit", "Missing or invalid schema", __assign({}, this.ctx, { schema: schema }));
        }
    };
    Composer.prototype.init = function () {
        this.validateInit();
        this.initKeyMaker();
        this.initEntryObj();
        this.initDispatcher();
        this.initTypeHandler();
        this.initResultHandler();
        this.initReferenceResolver();
        return this;
    };
    Composer.prototype.initKeyMaker = function (_a) {
        var _b = _a === void 0 ? {} : _a, key = _b.key, parentName = _b.parentName, config = _b.config;
        var target = this.target;
        key = key || this.key;
        parentName = parentName || this.parentName;
        config = config || this.config;
        var $createKeyMaker = config.createKeyMaker || createKeyMaker;
        var keyMaker = $createKeyMaker({ key: key, parentName: parentName }, config);
        this.validateCreated("initKeyMaker", "keyMaker", keyMaker);
        this.keyMaker = keyMaker;
        target.keyMaker = keyMaker;
        target.nestedKey = keyMaker.nestedKey;
        return this;
    };
    Composer.prototype.initEntryObj = function (_a) {
        var _b = _a === void 0 ? {} : _a, key = _b.key, nestedKey = _b.nestedKey, config = _b.config;
        var target = this.target;
        key = key || this.key;
        nestedKey = nestedKey || this.nestedKey;
        config = config || this.config;
        var $createEntryObj = config.createEntryObj || createEntryObj;
        var entryObj = $createEntryObj({ key: key, nestedKey: nestedKey }, config);
        this.validateCreated("initEntryObj", "entryObj", entryObj);
        target.entryObj = entryObj;
        var entry = entryObj.entry;
        this.entryObj = entryObj;
        this.entry = entry;
        target.entry = entryObj.entry;
        return this;
    };
    Composer.prototype.validateCreated = function (method, label, created) {
        if (!isObjectType(created)) {
            this.error(method, "Missing or invalid " + label, this.ctx);
        }
    };
    Composer.prototype.initDispatcher = function (config) {
        var target = this.target;
        config = config || this.config;
        var $createDispatcher = config.createDispatcher || createDispatcher;
        var dispatcher = $createDispatcher(config);
        this.validateCreated("initDispatcher", "dispatcher", dispatcher);
        target.dispatcher = dispatcher;
        this.dispatcher = dispatcher;
        return this;
    };
    Composer.prototype.initTypeHandler = function (_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, typeName = _b.typeName, calcType = _b.calcType, config = _b.config;
        var target = this.target;
        type = type || this.type;
        typeName = typeName || this.typeName;
        config = config || this.config;
        calcType = calcType || (function () { return type; });
        var $createTypeHandler = config.createTypeHandler || createTypeHandler;
        var entry = this.entry || this.defaultEntry;
        var opts = { typeName: typeName, entry: entry, type: type, calcType: calcType };
        var typeHandler = $createTypeHandler(opts, config);
        this.validateCreated("initTypeHandler", "typeHandler", typeHandler);
        this.typeHandler = typeHandler;
        target.typeHandler = typeHandler;
        return this;
    };
    Object.defineProperty(Composer.prototype, "defaultEntry", {
        get: function () {
            this.initEntryObj();
            return this.entry;
        },
        enumerable: true,
        configurable: true
    });
    Composer.prototype.initResultHandler = function (_a) {
        var _b = _a === void 0 ? {} : _a, entry = _b.entry, keyMaker = _b.keyMaker, typeHandler = _b.typeHandler, config = _b.config;
        var target = this.target;
        entry = entry || this.entry;
        keyMaker = keyMaker || this.keyMaker;
        typeHandler = typeHandler || this.typeHandler;
        config = config || this.config;
        var $createResultHandler = config.createResultHandler || createResultHandler;
        var resultHandler = $createResultHandler({ entry: entry, keyMaker: keyMaker, typeHandler: typeHandler }, config);
        this.validateCreated("initResultHandler", "resultHandler", resultHandler);
        target.resultHandler = resultHandler;
        this.resultHandler = resultHandler;
        return this;
    };
    Composer.prototype.initReferenceResolver = function (_a) {
        var _b = _a === void 0 ? {} : _a, opts = _b.opts, config = _b.config;
        var target = this.target;
        opts = opts || this.opts;
        config = config || this.config;
        var $createReferenceResolver = config.createReferenceResolver || createReferenceResolver;
        var referenceResolver = $createReferenceResolver(opts, config);
        this.validateCreated("initReferenceResolver", "referenceResolver", referenceResolver);
        target.referenceResolver = referenceResolver;
        this.referenceResolver = referenceResolver;
        return this;
    };
    return Composer;
}(InfoHandler));
module.exports = {
    Composer: Composer,
    createComposer: createComposer
};
//# sourceMappingURL=index.js.map