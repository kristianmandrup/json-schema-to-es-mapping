const { createMappingItem } = require("./item");
// const { arrays } = require("../data");

const create = (items, config) => {
  return new ItemsResolver(items, config);
};

describe.skip("Item Resolver", () => {
  const strItem = {
    type: "string"
  };
  const intItem = {
    type: "integer"
  };
  const items = [strItem, intItem];
  const config = {};

  const resolver = create(items, config);
});
