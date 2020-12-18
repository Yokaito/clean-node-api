import jwt from 'jsonwebtoken'
import { Encrypter, Decrypter } from '../../../data/protocols/cryptography'

export class JwtAdapter implements Encrypter, Decrypter {
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

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }
}
