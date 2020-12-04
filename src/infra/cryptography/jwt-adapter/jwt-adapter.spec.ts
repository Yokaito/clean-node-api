import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('JWT Adapter', () => {
  test('should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret', '1d')
    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret', { expiresIn: '1d' }, null)
  })
})
