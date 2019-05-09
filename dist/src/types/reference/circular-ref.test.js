"use strict";
var createReference = require("./reference").createReference;
var refs = {
    car: "#/definitions/car",
    driver: "#/definitions/driver"
};
var resolved = {
    car: {
        type: "object",
        name: "superCar",
        properties: {
            ownedBy: {
                $ref: "#/definitions/driver"
            }
        }
    },
    driver: {
        type: "object",
        name: "superCar",
        properties: {
            owns: {
                car: {
                    $ref: "#/definitions/car"
                }
            }
        }
    }
};
describe("Reference", function () {
    var schema = {
        type: "object",
        properties: {
            car: {
                $ref: "#/definitions/car"
            }
        },
        definitions: {
            car: resolved.car,
            driver: resolved.driver
        }
    };
    var config = {
        logging: true
    };
    var run = function (name, config) {
        var reference = refs[name];
        var opts = { schema: schema, reference: reference };
        var ref = createReference(opts, config);
        var obj = ref.resolvedRefObject;
        var expected = resolved[name];
        return [obj, expected, ref];
    };
    describe("car ref", function () {
        var _a = run("car", config), obj = _a[0], expected = _a[1], ref = _a[2];
        test("resolved to car object def", function () {
            expect(obj).toEqual(expected);
        });
        test("car ref has 0 hits", function () {
            expect(ref.hits[refs.car]).toBeUndefined();
        });
    });
    describe("driver ref", function () {
        var _a = run("driver"), obj = _a[0], expected = _a[1], ref = _a[2];
        test("resolved to driver", function () {
            expect(obj).toEqual(expected);
        });
        test("driver ref has 0 hits", function () {
            expect(ref.hits[refs.driver]).toBeUndefined();
        });
    });
    describe("driver, car, then driver ref again", function () {
        var _a = run("driver"), driverObj = _a[0], driver = _a[1], r1 = _a[2];
        var _b = run("car", r1.$config), carObj = _b[0], car = _b[1], r2 = _b[2];
        var _c = run("driver", r2.$config), driverAgainObj = _c[0], driverAgain = _c[1], r3 = _c[2];
        test("resolved to driver", function () {
            expect(driverObj).toBe(driverAgainObj);
        });
        test("first driver ref was not cache hit", function () {
            expect(r1.wasCacheHit).toBeFalsy();
        });
        test("car ref was not cache hit", function () {
            expect(r2.wasCacheHit).toBeFalsy();
        });
        test("car ref has 0 hits", function () {
            expect(r3.hits[refs.car]).toBeUndefined();
        });
        test("driver ref has 1 hits", function () {
            expect(r3.hits[refs.driver]).toBe(1);
        });
        test("driver ref was cache hit", function () {
            expect(r3.wasCacheHit).toBeTruthy();
        });
    });
});
//# sourceMappingURL=circular-ref.test.js.map