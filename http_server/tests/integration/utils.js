import { before, after } from 'node:test'
import { promisify } from 'node:util'
import { env } from '../../src/config/env.js'

const baseUrl = `${env.PROTOCOL}://${env.HOST}:${env.PORT}`

function configureSetupAndTeardown() {
  let server
  before(async () => {
    server = (await import('../../src/server.js')).server
  })
  after(async () => {
    await promisify(server.close.bind(server))()
  })
}

export { baseUrl, configureSetupAndTeardown }