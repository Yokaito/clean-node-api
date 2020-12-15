import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Controller, AddAccount, Authentication } from './signup-controller-protocols'
import { Validation } from '../../protocols/validation'

interface Body {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest<Body>): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      await this.addAccount.add({
        name: name,
        email: email,
        password: password
      })

      const accessToken = await this.authentication.auth({
        email, password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
