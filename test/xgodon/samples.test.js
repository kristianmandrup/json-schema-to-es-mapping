const { build } = require("../../");
const {
  schema_string,
  schema_integer,
  schema_number,
  schema_object,
  a,
  b,
  c,
  d,
  e,
  f,
  g
} = require("./samples");
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

test("integer", () => {
  const { properties } = JsToEs(schema_integer);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "integer"
    }
  });
});

test("number", () => {
  const { properties } = JsToEs(schema_number);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "float"
    }
  });
});

test("object", () => {
  const { properties } = JsToEs(schema_object);
  expect(properties).toEqual({
    MedlineCitation: {
      properties: {
        prop1: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        },
        prop2: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
      },
      type: "nested"
    }
  });
});

test("array_str", () => {
  const { properties } = JsToEs(a);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "text",
      fields: { keyword: { type: "keyword", ignore_above: 256 } }
    }
  });
});

test("list_to_str", () => {
  const { properties } = JsToEs(b);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "text",
      fields: { keyword: { type: "keyword", ignore_above: 256 } }
    }
  });
});

test("list_to_float", () => {
  const { properties } = JsToEs(c);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "float"
    }
  });
});

test("list_to_int", () => {
  const { properties } = JsToEs(d);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "integer"
    }
  });
});

test("anyof_str_obj", () => {
  const { properties } = JsToEs(e);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "nested",
      properties: {
        object_from_string: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        },
        prop1: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        },
        prop2: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
      }
    }
  });
});

test("anyof_num_obj", () => {
  const { properties } = JsToEs(f);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "nested",
      properties: {
        object_from_number: { type: "float" },
        prop1: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        },
        prop2: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
      }
    }
  });
});

test("anyof_int_obj", () => {
  const { properties } = JsToEs(g);
  expect(properties).toEqual({
    MedlineCitation: {
      type: "nested",
      properties: {
        object_from_integer: { type: "integer" },
        prop1: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        },
        prop2: {
          type: "text",
          fields: { keyword: { type: "keyword", ignore_above: 256 } }
        }
      }
    }
  });
});
