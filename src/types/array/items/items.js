const { MappingBaseType } = require("../../base");
const { createMappingItemFactory } = require("../item");

const createItemsMapping = (opts, config) => {
  return new MappingItems(opts, config);
};

class MappingItems extends MappingBaseType {
  constructor({ items, owner = {}, config = {} }) {
    super(config);
    this.items = items;
    this.ownerName = owner.name;

    const createMappingItem = createMappingItemFactory(config);
    const itemResolver = item => {
      return createMappingItem(item).resolve();
    };
    this.itemResolver = config.itemResolver || itemResolver;
  }

  resolve() {
    const resolveItem = this.resolveItem.bind(this);
    return this.items.map(resolveItem);
  }

  resolveItem(item) {
    item.ownerName = this.ownerName;
    return this.typeResolver(item);
  }

  typeResolver(item) {
    const payload = this.itemEntryPayload(item);
    return this.itemResolver(payload, this.config);
  }

  itemEntryPayload(item) {
    return {
      ownerName: this.key,
      item
    };
  }
}

module.exports = {
  createItemsMapping,
  MappingItems
};
