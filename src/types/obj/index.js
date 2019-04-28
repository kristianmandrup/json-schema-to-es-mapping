const { createAnyOfMapper, AnyOfMapper } = require("./any-of");

const typeObjMapperMap = {
  anyOf: createAnyOfMapper
};

const chooseObjMapper = key => typeObjMapperMap[key];

module.exports = {
  AnyOfMapper,
  chooseObjMapper
};
