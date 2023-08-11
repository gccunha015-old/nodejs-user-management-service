import { env } from './env'

const BASE_URL = `${env.PROTOCOL}://${env.HOST}:${env.PORT}/${env.API_VERSION}`

export { BASE_URL }
