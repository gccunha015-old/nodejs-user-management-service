import 'dotenv/config'

const ENV = process.env

const env = {
  PROTOCOL: ENV.PROTOCOL || 'http',
  HOST: ENV.HOST || 'localhost',
  PORT: Number(ENV.PORT) || 3000,
  API_VERSION: ENV.API_VERSION || 'v1'
}
if (ENV.NODE_ENV === 'test') {
  env.PORT = 9000
}

export { env }
