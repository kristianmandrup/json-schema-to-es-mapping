const schema_string = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: "string"
    }
  }
};

const schema_integer = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: "integer"
    }
  }
};

const schema_number = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: "number"
    }
  }
};

const schema_object = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: "object",
      properties: {
        prop1: {
          type: "string"
        },
        prop2: {
          type: "string"
        }
      }
    }
  }
};

const a = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: "array",
      items: {
        type: "string"
      }
    }
  }
};

const b = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: ["integer", "string", "number"]
    }
  }
};

const c = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: ["integer", "number"]
    }
  }
};

const d = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      type: ["integer"]
    }
  }
};

const e = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      anyOf: [
        {
          type: "string"
        },
        {
          type: "object",
          properties: {
            prop1: {
              type: "string"
            },
            prop2: {
              type: "string"
            }
          }
        }
      ]
    }
  }
};

const f = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      anyOf: [
        {
          type: "number"
        },
        {
          type: "object",
          properties: {
            prop1: {
              type: "string"
            },
            prop2: {
              type: "string"
            }
          }
        }
      ]
    }
  }
};

const g = {
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    MedlineCitation: {
      anyOf: [
        {
          type: "integer"
        },
        {
          type: "object",
          properties: {
            prop1: {
              type: "string"
            },
            prop2: {
              type: "string"
            }
          }
        }
      ]
    }
  }
};

module.exports = {
  schema_string
};
