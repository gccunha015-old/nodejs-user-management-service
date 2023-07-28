import http from 'node:http'
import { env } from './config/env.js'
import { handleRequests } from './handleRequests.js'

function createServer(
  port = env.PORT,
  host = env.HOST,
  protocol = env.PROTOCOL
) {
  return http.createServer(handleRequests)
    .listen(`${port}`, () => {
      console.log(`Server running @ ${protocol}://${host}:${port}`)
    })
}

export const server = createServer()