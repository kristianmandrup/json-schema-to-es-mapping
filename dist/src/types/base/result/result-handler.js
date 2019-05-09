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
var createResultHandler = function (opts, config) { return new ResultHandler(opts, config); };
var createKeyMaker = require("./key-maker").createKeyMaker;
var createTypeHandler = require("../type-handler").createTypeHandler;
var InfoHandler = require("../../info").InfoHandler;
var ResultHandler = /** @class */ (function (_super) {
    __extends(ResultHandler, _super);
    function ResultHandler(opts, config) {
        if (opts === void 0) { opts = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.opts = opts;
        _this.shouldSetResult = config.shouldSetResult || _this.shouldSetResult;
        // TODO: refactor to setter
        // this.keyMaker = this.getKeyMaker();
        // this.typeHandler = this.getTypeHandler();
        _this.keyMaker = _this.getOrCreateKeyMaker();
        _this.typeHandler = _this.getOrCreateTypeHandler();
        _this.resultKey = config.resultKey || _this.calcResultKey.bind(_this);
        _this.entry = opts.entry;
        _this.dispatcher = opts.dispatcher || config.dispatcher;
        _this.resultMap = config.resultMap || {};
        _this._type = opts.type;
        return _this;
    }
    Object.defineProperty(ResultHandler.prototype, "ctx", {
        get: function () {
            return {
                opts: this.opts,
                config: this.config
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultHandler.prototype, "keyMaker", {
        get: function () {
            return this._keyMaker;
        },
        set: function (keyMaker) {
            if (!keyMaker) {
                this.error("set keyMaker", "invalid or missing keyMaker", this.ctx);
            }
            this._keyMaker = keyMaker;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultHandler.prototype, "typeHandler", {
        get: function () {
            return this._typeHandler;
        },
        set: function (typeHandler) {
            if (!typeHandler) {
                this.error("set typeHandler", "invalid or missing typeHandler", this.ctx);
            }
            this._typeHandler = typeHandler;
        },
        enumerable: true,
        configurable: true
    });
    ResultHandler.prototype.getKeyMaker = function () {
        var _a = this, opts = _a.opts, config = _a.config;
        return opts.keyMaker || config.keyMaker;
    };
    ResultHandler.prototype.createKeyMaker = function () {
        var _a = this, opts = _a.opts, config = _a.config;
        return createKeyMaker(opts, config);
    };
    ResultHandler.prototype.getOrCreateTypeHandler = function () {
        return this.getTypeHandler() || this.createTypeHandler();
    };
    ResultHandler.prototype.getOrCreateKeyMaker = function () {
        return this.getKeyMaker() || this.createKeyMaker();
    };
    ResultHandler.prototype.getTypeHandler = function () {
        var _a = this, opts = _a.opts, config = _a.config;
        return opts.typeHandler || config.typeHandler;
    };
    ResultHandler.prototype.createTypeHandler = function () {
        var _a = this, opts = _a.opts, config = _a.config;
        return createTypeHandler(opts, config);
    };
    Object.defineProperty(ResultHandler.prototype, "type", {
        get: function () {
            return this._type || this.calcType();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultHandler.prototype, "_ctx", {
        get: function () {
            return {
                opts: this.opts,
                config: this.config
            };
        },
        enumerable: true,
        configurable: true
    });
    ResultHandler.prototype.calcType = function () {
        if (!this.typeHandler) {
            this.error("calcType", "Missing typeHandler", this._ctx);
        }
        return this.typeHandler.calcType();
    };
    ResultHandler.prototype.calcResultKey = function () {
        return this.keyMaker.resultKey;
    };
    ResultHandler.prototype.shouldSetResult = function () {
        return true;
    };
    Object.defineProperty(ResultHandler.prototype, "result", {
        get: function () {
            var key = this.resultKey(this);
            return this.resultMap[key];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultHandler.prototype, "resultKeyName", {
        get: function () {
            return this.resultKey();
        },
        enumerable: true,
        configurable: true
    });
    ResultHandler.prototype.createResult = function () {
        if (this._result)
            return this._result;
        this._result = __assign({ type: this.type }, this.entry);
        return this._result;
    };
    Object.defineProperty(ResultHandler.prototype, "resolvedResult", {
        get: function () {
            return this.createResult();
        },
        enumerable: true,
        configurable: true
    });
    ResultHandler.prototype.setResultMap = function (result) {
        this.resultMap[this.resultKeyName] = result;
    };
    ResultHandler.prototype.setResult = function (result) {
        this.setResultMap(result);
        this.dispatch();
    };
    ResultHandler.prototype.dispatch = function () {
        if (!this.dispatcher)
            return;
        this.dispatcher.dispatch(this.resolvedResult);
    };
    ResultHandler.prototype.createMappingResult = function () {
        return this.resolvedResult;
    };
    ResultHandler.prototype.createAndStoreResult = function () {
        if (this.shouldSetResult(this.resolvedResult)) {
            var result_1 = this.resolvedResult;
            this.setResult(result_1);
            return result_1;
        }
    };
    return ResultHandler;
}(InfoHandler));
module.exports = {
    createResultHandler: createResultHandler,
    ResultHandler: ResultHandler
};
//# sourceMappingURL=result-handler.js.map