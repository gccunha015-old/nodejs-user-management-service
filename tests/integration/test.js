import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'
import { env } from '../../src/config/env.js'
import User from '../../src/entities/user.js'

test('Integration Testing', async (t) => {
  const { server } = await import('../../src/server.js')
  const baseUrl = `${env.PROTOCOL}://${env.HOST}:${env.PORT}`
  await t.test(`GET on ${baseUrl}`, async (t) => {
    const response = await fetch(baseUrl)
    assert.strictEqual(
      response.status, 404,
      'it should return 404')
  })

  await t.test(`POST on ${baseUrl}/users`, async (t) => {
    const userToCreate = {
      email: 'test@test.com',
      password: 'password'
    }
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      body: JSON.stringify(userToCreate)
    })
    assert.strictEqual(response.status, 201, 'it should return 201')
    const data = await response.json()
    assert.ok(data.createdUser, 'it should return the created user')
  })
  await promisify(server.close.bind(server))()
})