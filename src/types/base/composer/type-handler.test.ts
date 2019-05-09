import { create, opts } from "./helpers";

const keysOf = obj => Object.keys(obj);
const isEmptyObj = obj => !obj || keysOf(obj).length === 0;

describe("create typeHandler", () => {
  describe("default", () => {
    describe("no init", () => {
      const composer = create(opts);
      test("is undefined before init", () => {
        expect(composer.typeHandler).toBeUndefined();
      });
    });

    describe("init", () => {
      const composer = create(opts);

      describe("invalid configuration", () => {
        test("throws", () => {
          expect(() => composer.initTypeHandler()).toThrow();
        });
      });

      describe("initTypeHandler", () => {
        const $opts = {
          ...opts,
          type: "string"
        };

        const composer = create($opts);
        composer.initTypeHandler();

        const { typeHandler } = composer;

        test("is function", () => {
          expect(typeof typeHandler).toEqual("object");
        });

        describe("typeHandler", () => {
          describe("empty typeMap and entry", () => {
            describe("typeMap", () => {
              const { typeMap } = typeHandler;
              test("is object", () => {
                expect(typeof typeMap).toEqual("object");
              });

              test("is empty", () => {
                expect(isEmptyObj(typeMap)).toBeTruthy();
              });
            });

            describe("entry", () => {
              const { entry } = typeHandler;
              test("is object", () => {
                expect(typeof entry).toEqual("object");
              });

              test("is empty", () => {
                expect(isEmptyObj(entry)).toBeTruthy();
              });
            });

            describe("entryType", () => {
              test("is undefined", () => {
                expect(typeHandler.entryType).toBeUndefined();
              });
            });

            describe("type", () => {
              test("is undefined", () => {
                expect(typeHandler.type).toBeUndefined();
              });
            });
          });

          describe("empty typeMap and entry passed in opts", () => {
            const entry = {
              type: "string"
            };
            const $opts = {
              ...opts,
              entry
            };
            const composer = create($opts);
            composer.initTypeHandler();

            const { typeHandler } = composer;

            describe("typeMap", () => {
              const { typeMap } = typeHandler;
              test("is object", () => {
                expect(typeof typeMap).toEqual("object");
              });

              test("is empty", () => {
                expect(isEmptyObj(typeMap)).toBeTruthy();
              });
            });

            describe("entry", () => {
              const { entry } = typeHandler;
              test("is object", () => {
                expect(typeof entry).toEqual("object");
              });

              test("is not empty", () => {
                expect(isEmptyObj(entry)).toBeFalsy();
              });
            });

            describe("entryType", () => {
              test("is string", () => {
                expect(typeHandler.entryType).toEqual("string");
              });
            });

            describe("type", () => {
              test("is string", () => {
                expect(typeHandler.type).toEqual("string");
              });
            });
          });

          describe("empty typeMap and config with createEntryObj", () => {
            const createEntryObj = () => ({
              entry: {
                type: "string"
              }
            });
            const $opts = {
              ...opts
            };
            const config = { createEntryObj };
            const composer = create($opts, config);
            composer.initTypeHandler();

            const { typeHandler } = composer;

            describe("typeMap", () => {
              const { typeMap } = typeHandler;
              test("is object", () => {
                expect(typeof typeMap).toEqual("object");
              });

              test("is empty", () => {
                expect(isEmptyObj(typeMap)).toBeTruthy();
              });
            });

            describe("entry", () => {
              const { entry } = typeHandler;
              test("is object", () => {
                expect(typeof entry).toEqual("object");
              });

              test("is not empty", () => {
                expect(isEmptyObj(entry)).toBeFalsy();
              });
            });

            describe("entryType", () => {
              test("is string", () => {
                expect(typeHandler.entryType).toEqual("string");
              });
            });

            describe("type", () => {
              test("is string", () => {
                expect(typeHandler.type).toEqual("string");
              });
            });
          });
        });
      });
    });
    describe("createTypeHandler passed in config", () => {
      const createTypeHandler = () => ({
        type: "string"
      });
      const config = {
        createTypeHandler
      };
      const composer = create(opts, config);

      describe("initKeyMaker", () => {
        composer.initTypeHandler();
        test("is object", () => {
          expect(typeof composer.typeHandler).toEqual("object");
        });

        describe("type", () => {
          test("is type of typeHandler created", () => {
            expect(composer.typeHandler.type).toEqual("string");
          });
        });
      });
    });
  });
});
