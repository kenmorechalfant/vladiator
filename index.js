/*
TODO:
- figure out how this works with selects, radios, checkboxes, etc
- custom named patterns
- min() and max() should check value of the number on a .num() (rather than length)
  - OR - num() takes in a min and max itself
  - ..what to do about conflicting rules: max is less than min, alpha + num
*/

const Tests = {
  required: (value) => (value.length > 0),
  min: (value, opts) => (value.length >= opts.length),
  max: (value, opts) => (value.length <= opts.length),
  alpha: (value) => /^[A-z]*$/.test(value),
  num: (value) =>  /^\d*$/.test(value),
  alphanum: (value) =>  /^\w*$/.test(value),
  email: (value) =>  /^\S+@\S+\.\S+$/.test(value),
  regex: (value, opts) => opts.regex.test(value)
}

const DefaultMessages = {
  default: (opts) => `${opts.key} is invalid`,
  required: (opts) => `${opts.key} is required`,
  min: (opts) => `${opts.key} must be at least ${opts.length} characters`,
  max: (opts) => `${opts.key} must be ${opts.length} characters or less`,
  alpha: (opts) => `${opts.key} must only contain letters`,
  num: (opts) => `${opts.key} must only contain numbers`,
  alphanum: (opts) => `${opts.key} must only contain letters and numbers`,
  regex: (opts) => `${opts.key} is invalid`
}

/**
 * class Vladiator
 *
 * Uses a schema object that lists Fields to be validated
 */

class Vladiator {
  constructor(schema = {}) {
    this.schema = schema
  }

  static get field() {
    return new Field()
  }

  validate(obj, addSchema = {}) {
    if (!obj) throw new Error('Validate [obj] must not be null or undefined')

    let valid = true,
        schema = {},
        errors = {}

    Object.assign(schema, this.schema, addSchema)

    let fieldNames = Object.keys(schema)

    fieldNames.forEach(fieldName => {
      let fieldErrors = schema[fieldName].test(obj[fieldName])

      if (fieldErrors.length) {
        valid = false
        errors[fieldName] = fieldErrors
      }
    })

    return { valid, errors }
  }

  static validate(obj, schema) {
    return (new this).validate(obj, schema)
  }
}

/**
 * class Field
 *
 * Represents one field. Contains a hash of all the rules on that field that
 * need to be met to be considered valid, as well as the error message for each
 * rule if it is invalid.
 *
 * TODO: add test() function to field, before test: run the sanitizers for this field
 */

class Field {
  constructor() {
    this.rules = {}
  }

  test(input) {
    let errors = [],
        ruleNames = Object.keys(this.rules)

    input = sanitize(input)

    ruleNames.forEach(ruleName => {
      let opts = this.rules[ruleName]
      let message = opts.message
      let valid = Tests[ruleName](input, opts)

      if (!valid) errors.push(message)
    })

    return errors
  }

  required(message) {
    this.rules.required = getErrorRule('required', message)
    return this
  }

  min(length, message) {
    validateLength(length, 'min')
    this.rules.min = getErrorRule('min', message, { length })
    return this
  }

  max(length, message) {
    validateLength(length, 'max')
    this.rules.max = getErrorRule('max', message, { length })
    return this
  }

  alpha(message) {
    this.rules.alpha = getErrorRule('alpha', message)
    return this
  }

  num(message) {
    this.rules.num = getErrorRule('num', message)
    return this
  }

  alphanum(message) {
    this.rules.alphanum = getErrorRule('alphanum', message)
    return this
  }

  email(message) {
    this.rules.email = getErrorRule('email', message)
    return this
  }

  regex(regex, message) {
    if (! regex instanceof RegExp) throw new Error('.regex() must take a RegExp')
    this.rules.regex = getErrorRule('regex', message, { regex })
    return this
  }
}

function getErrorRule(ruleName, message, opts = {}) {
  let outMessage

  switch (typeof message) {
    case 'string':
      outMessage = message
      break
    case 'function':
      outMessage = message(opts)
      break
    default:
      outMessage = DefaultMessages[ruleName] ?
      DefaultMessages[ruleName](opts) : DefaultMessages['default'](opts)
  }

  opts.message = outMessage
  return opts
}

function validateLength(length, ruleName) {
  if (typeof(length) === 'number' && Number.isInteger(length) && length > 0) {
    return true
  } else {
    throw new Error(`.${ruleName}() length must be a Positive Integer`)
  }
}

/**
 * Temporary, super-basic sanitizer
 *
 * TODO: make santizers work per-field and can have multiple different ones to
 * be run in series.
 */

function sanitize(value) {
  if (!value) value = ''
  // TODO: HTML escape
  if (typeof(value) !== 'string') value.toString()

  return value
}

module.exports = Vladiator
