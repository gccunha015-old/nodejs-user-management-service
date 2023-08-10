import { env } from './env'

const BASE_URL = `${env.PROTOCOL}://${env.HOST}:${env.PORT}`

export { BASE_URL }
