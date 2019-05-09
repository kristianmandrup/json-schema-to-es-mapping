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
var InfoHandler = require("../../info").InfoHandler;
var isFunction = require("../../util").isFunction;
var createResultDispatcher = function (config) { return new ResultDispatcher(config); };
var ResultDispatcher = /** @class */ (function (_super) {
    __extends(ResultDispatcher, _super);
    function ResultDispatcher(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.onResult = config.onResult;
        return _this;
    }
    ResultDispatcher.prototype.dispatch = function (payload) {
        if (!isFunction(this.onResult)) {
            this.info("dispatch", "missing onResult callback", {
                onResult: this.onResult
            });
            return;
        }
        this.onResult(payload);
    };
    return ResultDispatcher;
}(InfoHandler));
module.exports = {
    createResultDispatcher: createResultDispatcher,
    ResultDispatcher: ResultDispatcher
};
//# sourceMappingURL=result-dispatcher.js.map