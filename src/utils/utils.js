import { env } from "../config/env.js"

const DEFAULT_HEADER = {'Content-Type': 'application/json'}
const BASE_URL = `${env.PROTOCOL}://${env.HOST}:${env.PORT}`

export {DEFAULT_HEADER, BASE_URL}