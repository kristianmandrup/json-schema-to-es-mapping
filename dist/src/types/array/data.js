"use strict";
var arrays = {
    numberOfChildren: {
        description: "Children parented",
        type: "array",
        items: [
            {
                type: "number",
                format: "integer",
                name: "childCount",
                enum: [0, 1, 2]
            }
        ]
    }
};
module.exports = {
    arrays: arrays
};
//# sourceMappingURL=data.js.map