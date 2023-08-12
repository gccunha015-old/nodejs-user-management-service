import { Schema } from 'express-validator'

export class CreateUserValidation {
  public static schema: Schema = {
    email: {
      errorMessage: 'Invalid email',
      isEmail: true
    },
    password: {
      // isLength: {
      //   options: { min: 8 },
      //   errorMessage: 'Password should be at least 8 chars'
      // },
      notEmpty: true
    }
  }

  // private static _validateEmail(email: string): {

  // }
}
