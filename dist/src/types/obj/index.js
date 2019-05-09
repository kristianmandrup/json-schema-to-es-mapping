"use strict";
var _a = require("./any-of"), createAnyOfMapper = _a.createAnyOfMapper, AnyOfMapper = _a.AnyOfMapper;
var typeObjMapperMap = {
    anyOf: createAnyOfMapper
};
var chooseObjMapper = function (key) { return typeObjMapperMap[key]; };
module.exports = {
    AnyOfMapper: AnyOfMapper,
    chooseObjMapper: chooseObjMapper
};
//# sourceMappingURL=index.js.map