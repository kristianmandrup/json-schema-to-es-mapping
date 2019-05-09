"use strict";
var createLookupObject = function (opts, config) { return new LookupObject(opts, config); };
var LookupObject = /** @class */ (function () {
    function LookupObject(opts, config) {
        if (config === void 0) { config = {}; }
        var key = opts.key, value = opts.value, parentName = opts.parentName, resultKeyName = opts.resultKeyName, typeName = opts.typeName;
        this.key = key;
        this.resultKeyName = resultKeyName;
        this.parentName = parentName;
        this.config = config;
        this.value = value;
        this.typeName = typeName;
    }
    Object.defineProperty(LookupObject.prototype, "object", {
        get: function () {
            var obj = {
                key: this.key,
                resultKey: this.resultKeyName,
                parentName: this.parentName,
                schemaValue: this.value
            };
            if (this.typeName) {
                obj.typeName = this.typeName;
            }
            return obj;
        },
        enumerable: true,
        configurable: true
    });
    return LookupObject;
}());
module.exports = {
    createLookupObject: createLookupObject,
    LookupObject: LookupObject
};
//# sourceMappingURL=lookup.js.map