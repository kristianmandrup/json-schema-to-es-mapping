const createAnyOfMapper = (obj, opts) => {
  return new AnyOfMapper(obj, opts).convert();
};

class AnyOfMapper {
  constructor(obj, { key, type }) {}

  convert() {
    return {};
  }
}

module.exports = {
  AnyOfMapper
};
