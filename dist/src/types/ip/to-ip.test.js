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
var _a = require("./ip"), isIpKey = _a.isIpKey, isIp = _a.isIp, toIp = _a.toIp, MappingIp = _a.MappingIp;
var create = function (opts) { return (__assign({ type: "string" }, opts)); };
var createMappingIp = function (opts) {
    var $opts = objFor(opts);
    return MappingIp.create($opts);
};
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return { key: opts.key || "ip", type: value.type, value: value, schema: schema, config: config };
};
var ip = function (opts) {
    var $opts = objFor(opts);
    return toIp($opts);
};
describe("isIpKey", function () {
    test("undefined - false", function () {
        expect(isIpKey(undefined)).toBeFalsy();
    });
    test("ip - true", function () {
        expect(isIpKey("ip")).toBeTruthy();
    });
    test("ipAdr - true", function () {
        expect(isIpKey("ipAdr")).toBeTruthy();
    });
});
describe("isIp", function () {
    test("type: string, key: ip - true", function () {
        expect(isIp({ type: "string", key: "ip" })).toBeTruthy();
    });
    test("{type: string}, 'ip' - true", function () {
        expect(isIp({ type: "string" }, "ip")).toBeTruthy();
    });
    test("type: string, key: ip - true", function () {
        expect(isIp({ type: "string", key: "ipAdr" })).toBeTruthy();
    });
    test("type: string, key: myIp - false", function () {
        expect(isIp({ type: "string", key: "myIp" })).toBeFalsy();
    });
    test("type: integer - false", function () {
        expect(isIp({ type: "integer" })).toBeFalsy();
    });
    test("type: ip - false", function () {
        expect(isIp({ type: "ip" })).toBeFalsy();
    });
});
describe("MappingIp", function () {
    var obj = objFor();
    var mapper = MappingIp.create(obj);
    describe("type", function () {
        test("default: is ip", function () {
            expect(mapper.type).toEqual("ip");
        });
    });
});
describe("MappingIp", function () {
    describe("string: ip format", function () {
        var opts = {};
        var config = {};
        var $ip = createMappingIp(opts, config);
        var expected = {
            type: "ip"
        };
        test("ip", function () {
            expect($ip.convert()).toEqual(expected);
        });
    });
});
//# sourceMappingURL=to-ip.test.js.map