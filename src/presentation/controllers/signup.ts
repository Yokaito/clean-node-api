import { HttpResponse, HttpRequest } from '../protocols/http'

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
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequest.body?.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
