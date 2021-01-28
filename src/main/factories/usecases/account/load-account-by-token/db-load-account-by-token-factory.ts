import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import env from '@/environment/index'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET, env.EXPIRES_IN)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
