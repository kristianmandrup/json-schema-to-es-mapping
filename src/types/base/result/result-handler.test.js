const { createResultHandler } = require("./result-handler");
const create = createResultHandler;

describe("ResultHandler", () => {
  const handler = create();
  describe("createAndStoreResult", () => {
    test("should store", () => {
      handler.createAndStoreResult();
    });
  });
});
