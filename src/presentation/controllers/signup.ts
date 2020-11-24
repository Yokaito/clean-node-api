import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

interface Body {
  name: string
  email: string
  password: string
}

export class SignUpController {
  handle (httpRequest: HttpRequest<Body>): HttpResponse | undefined {
    if (!httpRequest.body?.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body?.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
