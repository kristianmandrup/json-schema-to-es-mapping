"use strict";
var createReference = require("./reference").createReference;
var refs = {
    car: "#/definitions/car",
    driver: "#/definitions/driver"
};
describe("Multi Reference", function () {
    var multiRefSchema = {
        type: "object",
        properties: {
            cars: {
                type: "array",
                items: {
                    $ref: "#/definitions/car"
                }
            }
        },
        definitions: {
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
                        cars: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/car"
                            }
                        }
                    }
                }
            }
        }
    };
    describe("circular resolved via cache", function () {
        var obj = ref.resolveRefObject();
        var config = {};
        var opts = { schema: multiRefSchema, reference: reference };
        var ref = createReference(opts, config);
        var reference = refs.car;
        test("is ", function () {
            expect(obj).toEqual(expected);
        });
    });
});
//# sourceMappingURL=circular-ref-multi.test.js.map