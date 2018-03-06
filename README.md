# Vladiator

Javascript validation library. Create a schema with chainable rules.

## Example

```js
const Vladiator = require('vladiator')

let data = {
  name: 'Jan-Michael Vincent'
}

const schema = {
  name: Vladiator.field.required().max(12, 'Custom Message: max 12 chars')
}

let result = Vladiator.validate(data, schema)

/*
{
  valid: false,
  errors: {
    name: [ 'Custom Message: max 12 chars' ]
  }
}
*/

```

## Installation

Not yet published on NPM. Still WIP.

## To-Do

- if not required and the value is empty, don't run other tests
- allow custom messages to be a function `(opts) => { ... }`
- allow min and max to be exclusive
- optional + min ? e.g.; field can be empty BUT if you put anything it must be min(n)
- allow multiple regex (right now subsequent ones will overwrite the prior)
- user-defined, named regex patterns in via some sort of config, e.g. `.regex('my-pattern')`
