"use strict";
var createLookupObject = require("./lookup").createLookupObject;
var createEntryObj = function (opts, config) {
    if (config === void 0) { config = {}; }
    return new EntryObj(opts, config);
};
var EntryObj = /** @class */ (function () {
    function EntryObj(opts, config) {
        if (config === void 0) { config = {}; }
        var key = opts.key, nestedKey = opts.nestedKey;
        this.key = key;
        this.config = config;
        this.nestedKey = nestedKey;
        this.entryFor = config.entryFor;
        this.lookupObj = createLookupObject(opts);
    }
    Object.defineProperty(EntryObj.prototype, "entry", {
        get: function () {
            return this.lookedUpEntry || this.configEntry || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryObj.prototype, "type", {
        get: function () {
            return this.entry.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryObj.prototype, "lookedUpEntry", {
        get: function () {
            var entryFor = this.entryFor;
            return entryFor && entryFor(this.lookupObj);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryObj.prototype, "fields", {
        get: function () {
            return this.config.fieldMap || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryObj.prototype, "configFieldEntry", {
        get: function () {
            return this.fields[this.key] || this.fields[this.nestedKey];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryObj.prototype, "configEntry", {
        get: function () {
            return this.configFieldEntry;
        },
        enumerable: true,
        configurable: true
    });
    return EntryObj;
}());
module.exports = {
    createEntryObj: createEntryObj,
    EntryObj: EntryObj
};
//# sourceMappingURL=entry.js.map