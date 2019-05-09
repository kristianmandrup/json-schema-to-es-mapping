"use strict";
var createResultDispatcher = require("./result-dispatcher").createResultDispatcher;
var create = function (done, expectation) {
    var config = {
        logging: true,
        onResult: function (result) {
            expectation(result);
            done();
        }
    };
    return createResultDispatcher(config);
};
var result = {
    done: true
};
describe("ResultDispatcher", function () {
    describe("dispatch", function () {
        test("payload dispatched", function (done) {
            var expectation = function (res) { return expect(res).toEqual(result); };
            var dispatcher = create(done, expectation);
            dispatcher.dispatch(result);
        });
    });
});
//# sourceMappingURL=result-dispatcher.test.js.map