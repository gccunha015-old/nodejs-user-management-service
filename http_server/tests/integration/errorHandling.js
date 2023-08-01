import { describe, it } from 'node:test'
import assert from 'node:assert'
import { baseUrl } from './utils.js'

function errorHandling() {
  describe('Error handling', () => {
    it('GET on /', async () => {
      const response = await fetch(baseUrl)
      assert.strictEqual(response.status, 404,
        'it should return status 404'
      )
    })
  })
}

export { errorHandling }