"use strict";
var buildConfig = require("./build-config").buildConfig;
function build(schema, config) {
    if (config === void 0) { config = {}; }
    var onComplete = config.onComplete, onThrow = config.onThrow;
    try {
        config = buildConfig(config, schema);
        properties = config.buildProperties(schema, config);
        results = config.result;
        onComplete && onComplete(results);
        return {
            properties: properties,
            results: results
        };
    }
    catch (err) {
        onThrow && onThrow(err);
        throw err;
    }
}
module.exports = {
    build: build,
    buildConfig: buildConfig
};
//# sourceMappingURL=build.js.map