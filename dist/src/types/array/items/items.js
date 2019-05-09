"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MappingBaseType = require("../../base").MappingBaseType;
var createMappingItemFactory = require("../item").createMappingItemFactory;
var createItemsMapping = function (opts, config) {
    return new MappingItems(opts, config);
};
var MappingItems = /** @class */ (function (_super) {
    __extends(MappingItems, _super);
    function MappingItems(_a) {
        var items = _a.items, _b = _a.owner, owner = _b === void 0 ? {} : _b, _c = _a.config, config = _c === void 0 ? {} : _c;
        var _this = _super.call(this, config) || this;
        _this.items = items;
        _this.ownerName = owner.name;
        var createMappingItem = createMappingItemFactory(config);
        var itemResolver = function (item) {
            return createMappingItem(item).resolve();
        };
        _this.itemResolver = config.itemResolver || itemResolver;
        return _this;
    }
    MappingItems.prototype.resolve = function () {
        var resolveItem = this.resolveItem.bind(this);
        return this.items.map(resolveItem);
    };
    MappingItems.prototype.resolveItem = function (item) {
        item.ownerName = this.ownerName;
        return this.typeResolver(item);
    };
    MappingItems.prototype.typeResolver = function (item) {
        var payload = this.itemEntryPayload(item);
        return this.itemResolver(payload, this.config);
    };
    MappingItems.prototype.itemEntryPayload = function (item) {
        return {
            ownerName: this.key,
            item: item
        };
    };
    return MappingItems;
}(MappingBaseType));
module.exports = {
    createItemsMapping: createItemsMapping,
    MappingItems: MappingItems
};
//# sourceMappingURL=items.js.map