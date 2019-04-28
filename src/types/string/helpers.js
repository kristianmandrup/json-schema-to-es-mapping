const create = opts => ({
  type: "string",
  ...opts
});

const config = {};
const schema = {};

const objFor = (opts = {}) => {
  const value = create(opts);
  return {
    key: "name",
    type: value.type,
    value,
    schema,
    config: opts.config || config
  };
};

const toStr = opts => {
  const $opts = objFor(opts);
  return toString($opts);
};

const string = opts => {
  const $opts = objFor(opts);
  return MappingString.create($opts);
};

module.exports = {
  create,
  objFor,
  toStr,
  string
};
