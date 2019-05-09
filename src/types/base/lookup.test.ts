import { createLookupObject } from "./lookup";

const create = (opts, config = {}) => createLookupObject(opts, config);

describe("lookup", () => {
  const config = {};
  const $opts = {
    key: "name",
    value: {
      type: "string"
    },
    parentName: "person",
    resultKeyName: "name"
  };

  describe("object", () => {
    const object = {
      key: $opts.key,
      resultKey: $opts.resultKeyName,
      parentName: $opts.parentName,
      schemaValue: $opts.value
    };
    describe("without typeName", () => {
      const opts = $opts;
      const lookup = create(opts, config);

      test("no typeName", () => {
        expect(lookup.object).toEqual(object);
      });
    });
    describe("with typeName", () => {
      const opts = {
        ...$opts,
        typeName: "string"
      };
      const lookup = create(opts, config);

      const objwType = {
        ...object,
        typeName: opts.typeName
      };

      test("has typeName", () => {
        expect(lookup.object).toEqual(objwType);
      });
    });
  });
});
