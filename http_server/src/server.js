import http from 'node:http'
import './config/prototype.js'
import { env } from './config/env.js'
import { prisma } from './config/database.js'
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

const server = createServer()

server.on('close', async () => {
  await prisma.$disconnect()
})

export { server }