"use strict";
var schema_string = {
    $schema: "http://json-schema.org/schema#",
    type: "object",
    properties: {
        MedlineCitation: {
            type: "string"
        }
    }
};
var schema_integer = {
    $schema: "http://json-schema.org/schema#",
    type: "object",
    properties: {
        MedlineCitation: {
            type: "integer"
        }
    }
};
var schema_number = {
    $schema: "http://json-schema.org/schema#",
    type: "object",
    properties: {
        MedlineCitation: {
            type: "number"
        }
    }
};
var schema_object = {
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
var a = {
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
var b = {
    $schema: "http://json-schema.org/schema#",
    type: "object",
    properties: {
        MedlineCitation: {
            type: ["integer", "string", "number"]
        }
    }
};
var c = {
    $schema: "http://json-schema.org/schema#",
    type: "object",
    properties: {
        MedlineCitation: {
            type: ["integer", "number"]
        }
    }
};
var d = {
    $schema: "http://json-schema.org/schema#",
    type: "object",
    properties: {
        MedlineCitation: {
            type: ["integer"]
        }
    }
};
var e = {
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
var f = {
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
var g = {
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
    schema_string: schema_string
};
//# sourceMappingURL=samples.js.map