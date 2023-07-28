import { describe, it } from 'node:test'
import assert from 'node:assert'
import { baseUrl } from './utils.js'

function userEndpoints() {
  describe('User endpoints', () => {
    const usersBaseUrl = `${baseUrl}/users`
    it('POST on /users', async () => {
      const userToCreate = {
        email: 'test@test.com',
        password: 'password'
      }
      const response = await fetch(usersBaseUrl, {
        method: 'POST',
        body: JSON.stringify(userToCreate)
      })
      assert.strictEqual(response.status, 201,
        'it should return status 201'
      )
      const data = await response.json()
      assert.ok(data.id && data.created_at,
        'it should return the created user with id and created_at'
      )
    })
  })
}

export { userEndpoints }