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
var isObjectType = require("../util").isObjectType;
var createSchemaValidator = function (config) { return new SchemaValidator(config); };
var SchemaValidator = /** @class */ (function (_super) {
    __extends(SchemaValidator, _super);
    function SchemaValidator(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    SchemaValidator.prototype.validate = function (schema) {
        !schema && this.error("validate", "Missing schema", { schema: schema });
        !isObjectType(schema) &&
            this.error("validate", "Invalid schema. Must be an Object, was: " + typeof schema);
        return true;
    };
    return SchemaValidator;
}(InfoHandler));
module.exports = {
    createSchemaValidator: createSchemaValidator,
    SchemaValidator: SchemaValidator
};
//# sourceMappingURL=schema-validator.js.map