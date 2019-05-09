"use strict";
var createSchemaValidator = require("./schema-validator").createSchemaValidator;
var schema = {
    definitions: {
        car: {
            type: "object",
            name: "superCar",
            properties: {}
        }
    }
};
describe("validateSchema", function () {
    var validator = createSchemaValidator();
    describe("missing schema", function () {
        test("is invalid", function () {
            expect(function () { return validator.validate(); }).toThrow();
        });
    });
    describe("bad schema", function () {
        test("is invalid", function () {
            expect(function () { return validator.validate("x"); }).toThrow();
        });
    });
    describe("valid schema", function () {
        test("is valid", function () {
            expect(function () { return validator.validate(schema); }).not.toThrow();
        });
    });
});
//# sourceMappingURL=schema-validator.test.js.map