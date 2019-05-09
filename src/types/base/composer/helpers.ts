import { createComposer } from ".";

const target = {};
const schema = {};

export const create = (opts, config: any = { logging: true }) => {
  const $opts = {
    target,
    schema,
    ...opts
  };
  return createComposer($opts, config);
};

export const opts = {
  key: "x",
  parentName: "person",
  value: { type: "string" }
};
