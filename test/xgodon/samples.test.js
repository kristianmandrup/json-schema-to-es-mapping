const { build } = require("../../");
const { schema_string } = require("./samples");
const JsToEs = build;

test("string", () => {
  const { properties } = JsToEs(schema_string);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "text",
      fields: { keyword: { type: "keyword", ignore_above: 256 } }
    }
  });
});
