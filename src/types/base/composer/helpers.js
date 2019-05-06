const { createComposer } = require(".");

const target = {};
const schema = {};

const create = (opts, config = { logging: true }) => {
  const $opts = {
    target,
    schema,
    ...opts
  };
  return createComposer($opts, config);
};

const opts = {
  key: "x",
  parentName: "person",
  value: { type: "string" }
};

module.exports = {
  opts,
  create,
  createComposer
};
