import env from '../environment'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import addAlias from './config/alias'
addAlias(env.PRODUCTION === 'true' ? 'dist' : 'src')

MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).default

    app.listen(env.PORT, () => {
      console.log(`Server running at http://localhost:${env.PORT}`)
      console.log(`Server is running with ENV_PRODUCTION: ${env.PRODUCTION}`)
    })
  })
  .catch(console.error)
