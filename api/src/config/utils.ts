import { env } from './env'

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }
const BASE_URL = `${env.PROTOCOL}://${env.HOST}:${env.PORT}`

export { DEFAULT_HEADER, BASE_URL }
