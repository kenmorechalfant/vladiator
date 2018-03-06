const Vladiator = require('../index')

const schema = {
  testField: Vladiator.field.min(3).max(6)
}

let data = {
  testField: '1234567'
}
let result = Vladiator.validate(data, schema)

console.log(result)
