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
var MappingBaseType = require("./base").MappingBaseType;
var MyType = /** @class */ (function (_super) {
    __extends(MyType, _super);
    function MyType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MyType.prototype, "typeName", {
        get: function () {
            return "my-type";
        },
        enumerable: true,
        configurable: true
    });
    return MyType;
}(MappingBaseType));
var create = function (opts, config) {
    opts.config = config;
    return new MyType(opts, config);
};
var reference = "#/definitions/car";
var schema = {
    definitions: {
        car: {
            type: "object",
            name: "superCar",
            properties: {}
        }
    }
};
describe("definitionResolver", function () {
    var config = {};
    describe.only("set on config", function () {
        var definitionResolver = function () { return 42; };
        var config = {
            definitionResolver: definitionResolver
        };
        var value = {
            $ref: reference
        };
        var opts = {
            schema: schema,
            key: "person",
            value: value
        };
        var mapper = create(opts, config);
        test("is one from config", function () {
            expect(mapper.referenceResolver).toBe(definitionResolver);
        });
    });
    describe("default", function () {
        var value = {
            $ref: reference
        };
        var opts = {
            schema: schema,
            key: "person",
            value: value
        };
        var mapper = create(opts, config);
        test("is set", function () {
            expect(mapper.referenceResolver).toBeDefined();
        });
    });
});
//# sourceMappingURL=reference.test.js.map