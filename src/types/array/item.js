const { MappingBaseType } = require("../base");
const { isFunction } = require("../util");
const { buildConfig } = require("../../build-config");

const createMappingItemFactory = (config = {}) => {
  config = buildConfig(config);
  return opts => {
    return new MappingItem(opts, config);
  };
};

class MappingItem extends MappingBaseType {
  constructor({ item, owner = {} }, config = {}) {
    super(config);
    this.item = item;
    this.config = config;
    this.ownerName = owner.name;
  }

  get resolver() {
    return this.config.itemResolver;
  }

  get validatedResolver() {
    if (!isFunction(this.resolver)) {
      this.error(
        "typeResolver",
        "Missing itemResolver (pass in config factories map)"
      );
    }
    return this.resolver;
  }

  resolve(item) {
    this.item = item || this.item;
    const payload = this.itemEntryPayload;
    return this.validatedResolver(payload, this.config);
  }

  get itemEntryPayload() {
    return {
      parentName: this.ownerName,
      value: this.item
    };
  }
}

module.exports = {
  createMappingItemFactory,
  MappingItem
};
