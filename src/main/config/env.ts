export default {
  MONGO_URL: process.env.MONGO_URL ?? 'mongodb+srv://rootUser:aE4O0Wl29UCrCgA8@cleannode.ufhbo.mongodb.net/clean-node-api?retryWrites=true&w=majority',
  PORT: process.env.PORT ?? 5050,
  jwtSecret: process.env.SECRET ?? 'aE4O0Wl29UCrCgA8@',
  expiresIn: process.env.EXPIRES_IN ?? '1d'
}
