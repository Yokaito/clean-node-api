import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Guilherme',
        email: 'guilherme@gmail.com',
        password: 'Adjiguix5',
        passwordConfirmation: 'Adjiguix5'
      })
      .expect(200)
  })
})
