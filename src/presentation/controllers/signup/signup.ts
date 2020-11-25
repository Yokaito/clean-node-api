import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'

import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount } from './signup-protocols'

interface Body {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest<Body>): HttpResponse | any {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, confirmPassword } = httpRequest.body

      if (password !== confirmPassword) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({
        name: name,
        email: email,
        password: password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
