"use strict";
var createRefValidator = require("./ref-validator").createRefValidator;
var reference = "#/definitions/car";
describe("validateRef", function () {
    var validator = createRefValidator(config);
    describe("missing reference", function () {
        test("is invalid", function () {
            expect(function () { return validator.validate(); }).toThrow();
        });
    });
    describe("invalid reference", function () {
        test("is invalid", function () {
            expect(function () { return validator.validate({}); }).toThrow();
        });
    });
    describe("valid reference", function () {
        test("is valid", function () {
            var valid = validator.validate(reference);
            expect(valid).toEqual(true);
        });
    });
});
//# sourceMappingURL=ref-validator.test.js.map