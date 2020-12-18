import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret', '1d')
}

describe('JWT Adapter', () => {
  describe('sign', () => {
    test('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy: any = jest.spyOn(jwt, 'sign')

      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret', { expiresIn: '1d' })
    })

    test('should return a token on sign success', async () => {
      const sut = makeSut()

      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('should throw if jwt sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
