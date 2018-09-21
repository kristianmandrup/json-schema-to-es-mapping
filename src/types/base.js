class ConvertMappingSchemaError extends Error {}

const $default = {
  config: {
    name: {
      type: 'text'
    },
    content: {
      type: 'text'
    },
    text: {
      type: 'text'
    },
    title: {
      type: 'text'
    },
    caption: {
      type: 'text'
    },
    label: {
      type: 'text'
    }
  }
}

class MappingBaseType {
  constructor({key, value, config}) {
    this.key = key
    this.value = value
    this.format = value.format
    this.config = {
      ...$default.config,
      ...config
    }
    this._meta = this.config._meta_ || {}
    this._types = this._meta.types || {}
  }

  get baseType() {
    this.error('default mapping type must be specified by subclass')
  }

  get configEntry() {
    return this.config[this.key] || {}
  }

  get configType() {
    return this.configEntry.type
  }

  convert() {
    return {
      ...this.configEntry,
      type: this.type
    }
  }

  get type() {
    return this.configType || this.baseType
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {}
  }

  errMessage(errKey = 'default') {
    return this.message[errKey] || 'error'
  }

  error(name, msg) {
    const errMSg = `[${name}] ${msg}`
    console.log(errMSg)
    throw new ConvertMappingSchemaError(errMSg)
  }
}

module.exports = {
  MappingBaseType,
  ConvertMappingSchemaError
}
