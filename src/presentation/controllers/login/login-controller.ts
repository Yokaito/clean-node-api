import { Authentication, Controller, HttpRequest, HttpResponse, Validation } from './login-controller-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'

interface Body {
  email: string
  password: string
}

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (authentication: Authentication, validation: Validation) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest<Body>): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
