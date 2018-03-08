const Vladiator = require('../index')


describe('Min rule', () => {
  test('fails with undefined length', () => {
    expect(() => {
      let schema = { minField: Vladiator.field.min() }
    }).toThrow()
  })

  test('fails with negative length', () => {
    expect(() => {
      let schema = { minField: Vladiator.field.min(-5) }
    }).toThrow()
  })

  test('fails with too short string', () => {
    let schema = { minField: Vladiator.field.min(5) }
    let data = { minField: '1234' }
    let result = Vladiator.validate(data, schema)
    expect(result.valid).toBe(false)
  })

  test('passes with long enough string', () => {
    let schema = { minField: Vladiator.field.min(5) }
    let data = { minField: '12345' }
    let result = Vladiator.validate(data, schema)
    expect(result.valid).toBe(true)
  })
})
