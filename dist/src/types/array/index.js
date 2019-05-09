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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MappingBaseType = require("../base").MappingBaseType;
var _a = require("../util"), isObjectType = _a.isObjectType, isArray = _a.isArray, isReferenceArray = _a.isReferenceArray;
function toArray(obj) {
    return isArray(obj.type) && MappingArray.create(obj).convert();
}
var MappingArray = /** @class */ (function (_super) {
    __extends(MappingArray, _super);
    function MappingArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MappingArray.prototype, "baseType", {
        get: function () {
            return "nested";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "typeName", {
        get: function () {
            return "array";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "entry", {
        get: function () {
            return __assign({}, this.lookedUpEntry, this.resolvedEntry);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "resolvedResult", {
        get: function () {
            var result = this.createResult();
            if (this.isReference) {
                delete result.type;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "includeInParent", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "resolvedEntry", {
        get: function () {
            return this.isReference ? this.referenceEntry : this.nestedEntry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "nestedEntry", {
        get: function () {
            return this.includeInParent
                ? {
                    include_in_parent: true
                }
                : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "isReference", {
        get: function () {
            return isReferenceArray(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "referenceEntry", {
        get: function () {
            return {
                _parent: { type: this.parentName },
                _source: { enabled: true },
                _all: { enabled: false }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "validItems", {
        get: function () {
            return Array.isArray(this.items) || isObjectType(this.items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "resolveFirstItem", {
        get: function () {
            if (!this.validItems)
                return {};
            return Array.isArray(this.items) ? this.selectFirstItem : this.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "firstItem", {
        get: function () {
            return this.items[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "selectFirstItem", {
        get: function () {
            return this.hasValidItemTypes ? this.firstItem : this.invalidItemTypes();
        },
        enumerable: true,
        configurable: true
    });
    MappingArray.prototype.invalidItemTypes = function () {
        this.error("Invalid item types for " + this.key + ". All array items must share the same type to be mappable to ElasticSearch", {
            schema: this.schema,
            items: this.items
        });
    };
    Object.defineProperty(MappingArray.prototype, "hasValidItemTypes", {
        get: function () {
            return this.hasSameItemTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "hasSameItemTypes", {
        get: function () {
            var type = this.firstItem.type;
            return this.items.every(function (item) { return item.type === type; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "items", {
        get: function () {
            return this.value.items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "arrayType", {
        get: function () {
            return this.resolveFirstItem.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "resolvedArrayType", {
        get: function () {
            return this.typeMap[this.arrayType];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MappingArray.prototype, "type", {
        get: function () {
            return this.configType || this.resolvedArrayType || this.baseType;
        },
        enumerable: true,
        configurable: true
    });
    MappingArray.create = function (obj) {
        return new MappingArray(obj).init();
    };
    return MappingArray;
}(MappingBaseType));
module.exports = {
    isArray: isArray,
    toArray: toArray,
    MappingArray: MappingArray
};
//# sourceMappingURL=index.js.map