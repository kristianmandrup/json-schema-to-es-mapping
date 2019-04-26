const $default = {
  config: {
    typeMap: {
      string: "keyword",
      number: "float",
      object: "object",
      array: "nested",
      boolean: "boolean",
      date: "date"
    },
    fieldMap: {
      name: {
        type: "keyword"
      },
      content: {
        type: "text"
      },
      text: {
        type: "text"
      },
      title: {
        type: "text"
      },
      caption: {
        type: "text"
      },
      label: {
        type: "text"
      },
      tag: {
        type: "keyword",
        index: "not_analyzed"
      }
    }
  }
};

module.exports = {
  $default
};
