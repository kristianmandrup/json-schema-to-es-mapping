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
var create = function (opts) { return (__assign({ type: "string" }, opts)); };
var config = {};
var schema = {};
var objFor = function (opts) {
    if (opts === void 0) { opts = {}; }
    var value = create(opts);
    return {
        key: "name",
        type: value.type,
        value: value,
        schema: schema,
        config: opts.config || config
    };
};
var toStr = function (opts) {
    var $opts = objFor(opts);
    return toString($opts);
};
var string = function (opts) {
    var $opts = objFor(opts);
    return MappingString.create($opts);
};
module.exports = {
    create: create,
    objFor: objFor,
    toStr: toStr,
    string: string
};
//# sourceMappingURL=helpers.js.map