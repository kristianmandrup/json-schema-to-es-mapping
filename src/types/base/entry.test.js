const { createEntryObj } = require("./entry");

const create = (opts, config = {}) => createEntryObj(opts, config);

describe("entry", () => {
  const [key, nestedKey] = ["name", "person_name"];
  const config = {};
  const opts = { key, nestedKey };
  const entryObj = create(opts, config);

  describe("create", () => {
    test("config", () => {
      expect(entryObj.config).toEqual(config);
    });

    test("key", () => {
      expect(entryObj.key).toBe(key);
    });

    test("nestedKey", () => {
      expect(entryObj.nestedKey).toBe(nestedKey);
    });
  });

  describe("lookedUpEntry", () => {
    describe("no entryFor", () => {
      test("void", () => {
        expect(entryObj.lookedUpEntry).toBeUndefined();
      });
    });

    describe("has entryFor", () => {
      const val = { name: "x" };
      const entryFor = () => val;
      const config = {
        entryFor
      };
      const entryObj = create(opts, config);
      test("sets entryFor", () => {
        expect(entryObj.entryFor).toBe(entryFor);
      });

      test("entry obj", () => {
        expect(entryObj.lookedUpEntry).toEqual(val);
      });
    });
  });

  describe("fields", () => {
    describe("no field map", () => {
      const config = {
        fieldMap: null
      };
      const entryObj = create(opts, config);

      test("void", () => {
        expect(entryObj.fields).toEqual({});
      });
    });

    describe("empty field map", () => {
      const config = {
        fieldMap: {}
      };
      const entryObj = create(opts, config);

      test("void", () => {
        expect(entryObj.fields).toEqual({});
      });
    });

    describe("has fieldMap", () => {
      const fieldMap = {
        name: {
          type: "string"
        }
      };
      const config = {
        fieldMap
      };
      const entryObj = create(opts, config);
      test("is fieldMap", () => {
        expect(entryObj.fields).toBe(fieldMap);
      });
    });
  });

  describe("configFieldEntry", () => {
    describe("no match", () => {
      const config = {
        fieldMap: null
      };
      const entryObj = create(opts, config);

      test("void", () => {
        expect(entryObj.configFieldEntry).toBeUndefined();
      });
    });

    describe("map for key", () => {
      const entry = {
        type: "string"
      };

      const config = {
        fieldMap: {
          name: entry
        }
      };
      const entryObj = create(opts, config);

      test("void", () => {
        expect(entryObj.configFieldEntry).toEqual(entry);
      });
    });

    describe("map for nestedKey", () => {
      const entry = {
        type: "keyword"
      };
      const fieldMap = {
        person_name: entry
      };
      const config = {
        fieldMap
      };
      const entryObj = create(opts, config);
      test("is fieldMap", () => {
        expect(entryObj.configFieldEntry).toEqual(entry);
      });
    });
  });

  describe("entry", () => {});
});
