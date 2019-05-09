"use strict";
var createAnyOfMapper = function (obj, opts) {
    return new AnyOfMapper(obj, opts).convert();
};
var AnyOfMapper = /** @class */ (function () {
    function AnyOfMapper(obj, _a) {
        var key = _a.key, type = _a.type;
    }
    AnyOfMapper.prototype.convert = function () {
        return {};
    };
    return AnyOfMapper;
}());
module.exports = {
    AnyOfMapper: AnyOfMapper
};
//# sourceMappingURL=any-of.js.map