"use strict";
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
var _a = require("./point"), isPointType = _a.isPointType, isPointArray = _a.isPointArray, isPointArrayItem = _a.isPointArrayItem, isPointArrayItems = _a.isPointArrayItems, hasNumericItem = _a.hasNumericItem, short = _a.short, full = _a.full, isLocationKey = _a.isLocationKey, isLocationKeyAndObj = _a.isLocationKeyAndObj, isGeoPoint = _a.isGeoPoint, toGeoPoint = _a.toGeoPoint, MappingGeoPoint = _a.MappingGeoPoint;
var create = function (opts) { return (__assign({ type: "string" }, opts)); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return {
        key: opts.key || "location",
        type: value.type,
        value: value,
        schema: schema,
        config: config
    };
};
var point = function (opts) {
    var $opts = objFor(opts);
    return toGeoPoint($opts);
};
describe("isPointType,", function () {
    test("type: string, key: location - true", function () {
        expect(isPointType({ type: "string" })).toBeTruthy();
    });
});
describe("isPointArray", function () {
    test("type: array, items: integer", function () {
        var items = {
            type: "integer"
        };
        expect(isPointArray({ type: "array", minItems: 2, maxItems: 2, items: items })).toBeTruthy();
    });
    test("type: array, items: integer", function () {
        var items = [
            {
                type: "integer"
            },
            {
                type: "integer"
            }
        ];
        expect(isPointArray({ type: "array", items: items })).toBeTruthy();
    });
});
describe("isPointArrayItem", function () {
    test("type: array, items: integer", function () {
        var obj = { type: "array", minItems: 2, maxItems: 2 };
        var item = {
            type: "integer"
        };
        expect(isPointArrayItem(obj, item)).toBeTruthy();
    });
});
describe("isPointArrayItems", function () {
    test("type: array, items: integer", function () {
        var items = [
            {
                type: "integer"
            },
            {
                type: "integer"
            }
        ];
        expect(isPointArrayItems(items)).toBeTruthy();
    });
});
describe("hasNumericItem", function () {
    var items = [
        {
            type: "integer"
        },
        {
            type: "integer"
        }
    ];
    test("type: number", function () {
        expect(hasNumericItem(items, 0)).toBeTruthy();
    });
});
describe("short", function () {
    test("lat - false", function () {
        expect(short({
            lat: {
                type: "number"
            }
        })).toBeFalsy();
    });
    test("lng - false", function () {
        expect(short({ lng: { type: "number" } })).toBeFalsy();
    });
    test("lat and lng", function () {
        expect(short({
            lat: {
                type: "number"
            },
            lng: { type: "number" }
        })).toBeTruthy();
    });
});
describe("full", function () {
    test("latitude - false", function () {
        expect(full({
            latitude: {
                type: "number"
            }
        })).toBeFalsy();
    });
    test("longitude  - false", function () {
        expect(full({ longitude: { type: "number" } })).toBeFalsy();
    });
    test("latitude and longitude - true", function () {
        expect(full({
            latitude: {
                type: "number"
            },
            longitude: { type: "number" }
        })).toBeTruthy();
    });
});
describe("isLocationKey", function () {
    test("mylocation", function () {
        expect(isLocationKey("mylocation")).toBeTruthy();
    });
    test("loc", function () {
        expect(isLocationKey("loc")).toBeFalsy();
    });
});
describe("isLocationKeyAndObj", function () {
    test("type: string, key: location - true", function () {
        expect(isLocationKeyAndObj("location", { type: "string" })).toBeTruthy();
    });
    test("type: string, key: myIp - false", function () {
        expect(isLocationKeyAndObj("loc", { type: "string" })).toBeFalsy();
    });
});
describe("isGeoPoint", function () {
    test("type: string, key: location - true", function () {
        expect(isGeoPoint({ type: "string" }, "location")).toBeTruthy();
    });
    test("type: string, key: myIp - false", function () {
        expect(isGeoPoint({ type: "string", key: "myIp" })).toBeFalsy();
    });
    test("type: integer - false", function () {
        expect(isGeoPoint({ type: "integer" })).toBeFalsy();
    });
    test("type: location - false", function () {
        expect(isGeoPoint({ type: "location" })).toBeFalsy();
    });
});
describe("MappingGeoPoint", function () {
    var obj = objFor();
    var mapper = MappingGeoPoint.create(obj);
    describe("type", function () {
        test("default: is location", function () {
            expect(mapper.type).toEqual("geo_point");
        });
    });
});
//# sourceMappingURL=to-geo-point.test.js.map