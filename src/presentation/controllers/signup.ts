import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

interface Body {
  name: string
  email: string
  password: string
}

export class SignUpController {
  handle (httpRequest: HttpRequest<Body>): HttpResponse {
    const requiredFields = ['name', 'email']
    let fieldError = ''

    for (const field of requiredFields) {
      if (!httpRequest.body?.[field]) {
        fieldError = field
      }
    }

    return badRequest(new MissingParamError(fieldError))
  }
}
