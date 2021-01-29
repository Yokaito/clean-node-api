import dotenv from 'dotenv'
dotenv.config()

export default {
  MONGO_URL: process.env.MONGO_URL ?? process.env.MONGO_DATABASE,
  PORT: process.env.PORT ?? 5050,
  JWT_SECRET: process.env.SECRET ?? 'aE4O0Wl29UCrCgA8@',
  EXPIRES_IN: process.env.EXPIRES_IN ?? '1d',
  PRODUCTION: process.env.PRODUCTION ?? 'false'
}
