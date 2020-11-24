import { HttpResponse, HttpRequest } from '../protocols/http'
import { Controller } from '../protocols/controller'

import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
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

  handle (httpRequest: HttpRequest<Body>): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    let fieldError = ''

    for (const field of requiredFields) {
      if (!httpRequest.body?.[field]) {
        fieldError = field
      }
    }

    return badRequest(new MissingParamError(fieldError))
  }
}
