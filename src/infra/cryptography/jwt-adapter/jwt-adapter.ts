import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor (
    private readonly secret: string,
    private readonly expiresIn: string
  ) {
    this.secret = secret
    this.expiresIn = expiresIn
  }

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret, {
      expiresIn: this.expiresIn
    })

    return accessToken
  }
}
