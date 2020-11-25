import { HttpResponse, HttpRequest } from '../protocols/http'
import { Controller } from '../protocols/controller'

import { badRequest, serverError } from '../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../errors'

import { EmailValidator } from '../protocols/email-validator'

interface Body {
  name: string
  email: string
  password: string
}

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest<Body>): HttpResponse | any {
    try {
      const requiredFields = ['name', 'email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
