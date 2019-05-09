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
var createComposer = require(".").createComposer;
var target = {};
var schema = {};
var create = function (opts, config) {
    if (config === void 0) { config = { logging: true }; }
    var $opts = __assign({ target: target,
        schema: schema }, opts);
    return createComposer($opts, config);
};
var opts = {
    key: "x",
    parentName: "person",
    value: { type: "string" }
};
module.exports = {
    opts: opts,
    create: create,
    createComposer: createComposer
};
//# sourceMappingURL=helpers.js.map