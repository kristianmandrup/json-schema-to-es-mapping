import { createAnyOfMapper, AnyOfMapper } from "./any-of";

const typeObjMapperMap = {
  anyOf: createAnyOfMapper
};

const chooseObjMapper = key => typeObjMapperMap[key];

export { AnyOfMapper, chooseObjMapper };
