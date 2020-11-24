import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

interface Body {
  name: string
  email: string
  password: string
}

export class SignUpController {
  handle (httpRequest: HttpRequest<Body>): HttpResponse | undefined {
    if (!httpRequest.body?.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body?.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
