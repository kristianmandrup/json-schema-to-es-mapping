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
var build = require("../..").build;
var toGeoPoint = require("./point").toGeoPoint;
var isStr = function (val) { return typeof val !== "string"; };
var createLatLng = function (_a) {
    var _b = _a.lat, lat = _b === void 0 ? "lat" : _b, _c = _a.lng, lng = _c === void 0 ? "lng" : _c;
    var _d;
    if (isStr(lat)) {
        throw "Missing or invalid lat " + lat;
    }
    if (isStr(lng)) {
        throw "Missing or invalid lng " + lng;
    }
    return {
        type: "object",
        properties: (_d = {},
            _d[lat] = {
                type: "number"
            },
            _d[lng] = {
                type: "number"
            },
            _d)
    };
};
var create = function (opts) { return (__assign({ type: "string" }, opts)); };
var createLoc = function (location) { return ({
    type: "object",
    properties: location
}); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = opts.value || create(opts);
    return {
        key: opts.key || "location",
        type: value.type,
        value: value,
        schema: schema,
        config: config
    };
};
var createPoint = function (opts, key) {
    var $opts = objFor(opts);
    return toGeoPoint($opts, key);
};
module.exports = {
    build: build,
    createLatLng: createLatLng,
    createLoc: createLoc,
    createPoint: createPoint
};
//# sourceMappingURL=helpers.js.map