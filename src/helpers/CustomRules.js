import { Validator } from 'vee-validate'

Validator.extend('phoneRules', {
  getMessage: field => 'Invalid [example format: 555-555-5555].',
  validate: value => {
    const PhoneReg = /^\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    return PhoneReg.test(value)
  }
})

Validator.extend('passwordRules', {
  getMessage: field =>
    `The passwords should be contain at least 1 letter, 1 number, and 1 punctuation[like !or@].`,
  validate: value => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )
    return strongRegex.test(value)
  }
})
