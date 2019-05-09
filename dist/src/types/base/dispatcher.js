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
var createResultDispatcher = require("./result").createResultDispatcher;
var createLookupObject = require("./lookup").createLookupObject;
var createDispatcher = function (opts, config) { return new Dispatcher(opts, config); };
var Dispatcher = /** @class */ (function () {
    function Dispatcher(opts, config) {
        if (opts === void 0) { opts = {}; }
        if (config === void 0) { config = {}; }
        var $createResultDispatcher = config.createResultDispatcher || createResultDispatcher;
        this.dispatcher = $createResultDispatcher(config);
        this.lookup = createLookupObject(opts, config);
    }
    Dispatcher.prototype.dispatch = function (result) {
        this.dispatcher.dispatch(this.dispatchObjFor(result));
    };
    Object.defineProperty(Dispatcher.prototype, "lookupObj", {
        get: function () {
            return this.lookup.object;
        },
        enumerable: true,
        configurable: true
    });
    Dispatcher.prototype.dispatchObjFor = function (result) {
        return __assign({}, this.lookupObj, result);
    };
    return Dispatcher;
}());
module.exports = {
    createDispatcher: createDispatcher,
    Dispatcher: Dispatcher
};
//# sourceMappingURL=dispatcher.js.map