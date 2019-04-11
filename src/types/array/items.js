const { MappingBaseType } = require("../base");
const { createMappingItem } = require("./item");

const createItemsMapping = (items, config) => {
  return new MappingItems({ items, config });
};

class MappingItems extends MappingBaseType {
  constructor({ items, owner = {}, config = {} }) {
    super(config);
    this.items = items;
    this.ownerName = owner.name;

    const mapItem = createMappingItem(config).bind(this);
    const itemResolver = item => mapItem(item).convert();

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
      parentName: this.key,
      value: item
    };
  }
}

module.exports = {
  createItemsMapping,
  MappingItems
};
