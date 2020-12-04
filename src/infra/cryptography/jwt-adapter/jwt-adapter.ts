import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  private readonly secret: string
  private readonly expiresIn: string

  constructor (secret: string, expiresIn: string) {
    this.secret = secret
    this.expiresIn = expiresIn
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secret, {
      expiresIn: this.expiresIn
    }, null)
    return null
  }
}
