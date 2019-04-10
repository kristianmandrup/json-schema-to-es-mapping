const { MappingBaseType } = require("../base");
const { createItemResolver } = require("./item");

const createItemsMapping = (items, config) => {
  return new MappingItems(items, config);
};

class MappingItems extends MappingBaseType {
  constructor({ items, owner = {}, config = {} }) {
    super(config);
    this.items = items;
    this.ownerName = owner.name.id;
    this.itemResolver = config.itemResolver || createItemResolver(config);
  }

  resolve() {
    return this.items.map(this.resolveItem.bind(this));
  }

  resolveItem(item) {
    item.ownerName = this.ownerName;
    return this.typeResolver(item);
  }

  typeResolver(item) {
    const payload = itemEntryPayload(item);
    return this.validItemResolver(payload, this.config);
  }

  itemEntryPayload(item) {
    return {
      parentName: this.key,
      value: item
    };
  }
}

module.exports = {
  createItemsMapping,
  MappingItems
};
