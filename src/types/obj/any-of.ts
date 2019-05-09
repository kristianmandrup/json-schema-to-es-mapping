export const createAnyOfMapper = (obj, opts) => {
  return new AnyOfMapper(obj, opts).convert();
};

export class AnyOfMapper {
  constructor(obj, { key, type }) {}

  convert() {
    return {};
  }
}
