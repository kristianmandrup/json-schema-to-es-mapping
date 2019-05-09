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
var isFunction = require("./util").isFunction;
var ConvertMappingSchemaError = /** @class */ (function (_super) {
    __extends(ConvertMappingSchemaError, _super);
    function ConvertMappingSchemaError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConvertMappingSchemaError;
}(Error));
var InfoHandler = /** @class */ (function () {
    function InfoHandler(config) {
        if (config === void 0) { config = {}; }
        this.config = config || this.config;
        this.logging = config.logging;
        this.log = config.log || console.log;
        this.throws =
            config.throws === true ||
                (config.throws === undefined && !config.onError);
    }
    InfoHandler.prototype.captionedMsg = function (name, msg) {
        return "[" + this.constructor.name + ":" + name + "] " + msg;
    };
    InfoHandler.prototype.info = function (name, msg, data) {
        if (!this.logging)
            return;
        var infoMsg = this.captionedMsg(name, msg);
        var log = this.log;
        data ? log(infoMsg, data) : log(infoMsg);
    };
    InfoHandler.prototype.error = function (name, msg, data) {
        var errMsg = this.captionedMsg(name, msg);
        this.info(name, msg, data);
        if (this.throws) {
            this.throw(errMsg);
        }
        this.onError(errMsg, data);
    };
    InfoHandler.prototype.throw = function (errMsg) {
        if (!this.throws)
            return;
        throw new ConvertMappingSchemaError(errMsg);
    };
    InfoHandler.prototype.onError = function (errMsg, data) {
        var onError = this.config.onError;
        if (!isFunction(onError))
            return;
        onError(errMsg, data);
    };
    return InfoHandler;
}());
module.exports = {
    InfoHandler: InfoHandler
};
//# sourceMappingURL=info.js.map