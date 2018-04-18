const Vladiator = require('../index')

const schema1 = {
  defaultField: Vladiator.field.required()
}

test('Required field fails with default error message', () => {
  let data = {}
  let result = Vladiator.validate(data, schema1)
  let errorMsg = result.errors['defaultField'][0]

  expect(errorMsg).toBe('defaultField is required')
})

const customMsg = 'This is a custom message'
const schema2 = {
  customField: Vladiator.field.required(customMsg)
}

test('Required field fails with custom error message', () => {
  let data = {}
  let result = Vladiator.validate(data, schema2)
  let errorMsg = result.errors['customField'][0]

  expect(errorMsg).toBe(customMsg)
})
