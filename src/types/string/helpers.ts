import { toString, MappingString } from "./string";

export const create = opts => ({
  type: "string",
  ...opts
});

const config = {};
const schema = {};

export const objFor = (opts: any = {}) => {
  const value = create(opts);
  return {
    key: "name",
    type: value.type,
    value,
    schema,
    config: opts.config || config
  };
};

export const toStr = opts => {
  const $opts = objFor(opts);
  return toString($opts);
};

export const string = opts => {
  const $opts = objFor(opts);
  return MappingString.create($opts);
};
