const Vladiator = require('../index')

const userSchema = {
  email: Vladiator.field.email(),
  password: Vladiator.field.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#\$%\^&\*,\.\?])\S{6,60}$/,
      'Password must be 6-60 characters, contain at least 1 lowercase letter, 1 uppercase letter and 1 of the following: \'0123456789!@#$%^&*,.?\''
    )
}

class UserValidator extends Vladiator {
  constructor(schema = {}) {
    schema = Object.assign(userSchema, schema)
    super(schema)
  }

  // static validate(obj) {
  //   super.validate(obj, userSchema)
  // }
}

module.exports = UserValidator
