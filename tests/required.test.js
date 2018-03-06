const Vladiator = require('../index')

const schema = {
  requiredField: Vladiator.field.required()
}

describe('Required field', () => {
  test('fails with undefined value', () => {
    let data = {}
    let result = Vladiator.validate(data, schema)
    expect(result.valid).toBe(false)
  })

  test('fails with empty string', () => {
    let data = { requiredField: '' }
    let result = Vladiator.validate(data, schema)
    expect(result.valid).toBe(false)
  })


  test('passes with filled string', () => {
    let data = { requiredField: 'some string' }
    let result = Vladiator.validate(data, schema)
    expect(result.valid).toBe(true)
  })
})
