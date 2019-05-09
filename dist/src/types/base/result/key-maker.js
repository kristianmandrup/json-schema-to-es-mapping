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
var isStringType = require("../../util").isStringType;
var InfoHandler = require("../../info").InfoHandler;
var createKeyMaker = function (opts, config) { return new KeyMaker(opts, config); };
var KeyMaker = /** @class */ (function (_super) {
    __extends(KeyMaker, _super);
    function KeyMaker(opts, config) {
        if (opts === void 0) { opts = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        var key = opts.key, parentName = opts.parentName;
        _this.opts = opts;
        _this.nameSeparator = config.nameSeparator || _this.defaultNameSeparator;
        _this.parentName = parentName;
        _this.key = key;
        return _this;
    }
    Object.defineProperty(KeyMaker.prototype, "ctx", {
        get: function () {
            return {
                opts: this.opts,
                config: this.config
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyMaker.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (key) {
            if (!isStringType(key)) {
                this.error("set key", "Invalid or missing key " + key, this.ctx);
            }
            this._key = key;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyMaker.prototype, "defaultNameSeparator", {
        get: function () {
            return "_";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyMaker.prototype, "nestedKey", {
        get: function () {
            return this.config.nestedKey
                ? this.config.nestedKey()
                : this.calcNestedKey();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyMaker.prototype, "resultKey", {
        get: function () {
            return this.nested ? this.nestedKey() : this.key;
        },
        enumerable: true,
        configurable: true
    });
    KeyMaker.prototype.calcNestedKey = function () {
        return this.parentName
            ? [this.parentName, this.key].join(this.nameSeparator)
            : this.key;
    };
    return KeyMaker;
}(InfoHandler));
module.exports = {
    createKeyMaker: createKeyMaker,
    KeyMaker: KeyMaker
};
//# sourceMappingURL=key-maker.js.map