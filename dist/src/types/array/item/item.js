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
var MappingBaseType = require("../base").MappingBaseType;
var isFunction = require("../util").isFunction;
var buildConfig = require("../../build-config").buildConfig;
var createMappingItemFactory = function (config) {
    if (config === void 0) { config = {}; }
    config = buildConfig(config);
    return function (opts) {
        return new MappingItem(opts, config);
    };
};
var MappingItem = /** @class */ (function (_super) {
    __extends(MappingItem, _super);
    function MappingItem(_a, config) {
        var item = _a.item, _b = _a.owner, owner = _b === void 0 ? {} : _b;
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.item = item;
        _this.config = config;
        _this.ownerName = owner.name;
        return _this;
    }
    Object.defineProperty(MappingItem.prototype, "resolver", {
        get: function () {
            return this.config.itemResolver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingItem.prototype, "validatedResolver", {
        get: function () {
            if (!isFunction(this.resolver)) {
                this.error("typeResolver", "Missing itemResolver (pass in config factories map)");
            }
            return this.resolver;
        },
        enumerable: true,
        configurable: true
    });
    MappingItem.prototype.resolve = function (item) {
        this.item = item || this.item;
        var payload = this.itemEntryPayload;
        return this.validatedResolver(payload, this.config);
    };
    Object.defineProperty(MappingItem.prototype, "itemEntryPayload", {
        get: function () {
            return {
                parentName: this.ownerName,
                value: this.item
            };
        },
        enumerable: true,
        configurable: true
    });
    return MappingItem;
}(MappingBaseType));
module.exports = {
    createMappingItemFactory: createMappingItemFactory,
    MappingItem: MappingItem
};
//# sourceMappingURL=item.js.map