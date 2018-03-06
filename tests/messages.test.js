const Vladiator = require('../index')

const customMsg = 'This is a custom message'

const schema = {
  field: Vladiator.field.required(customMsg)
}

test('Required field fails with custom error message', () => {
  let data = {}
  let result = Vladiator.validate(data, schema)
  let errorMsg = result.errors.field[0]

  expect(errorMsg).toBe(customMsg)
})
