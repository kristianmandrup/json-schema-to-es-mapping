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
var InfoHandler = require("../info").InfoHandler;
var _a = require("../util"), isStringType = _a.isStringType, isObjectType = _a.isObjectType;
var createRefValidator = function (config) { return new RefValidator(config); };
var RefValidator = /** @class */ (function (_super) {
    __extends(RefValidator, _super);
    function RefValidator(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    RefValidator.prototype.validate = function (reference) {
        !reference && this.error("validate", "Missing reference");
        !isStringType(reference) &&
            this.error("validate", "Reference invalid. Must be a string, was: " + typeof reference, {
                reference: reference
            });
        return true;
    };
    return RefValidator;
}(InfoHandler));
module.exports = {
    createRefValidator: createRefValidator,
    RefValidator: RefValidator
};
//# sourceMappingURL=ref-validator.js.map