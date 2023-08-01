import { describe } from 'node:test'
import { configureSetupAndTeardown } from './utils.js'
import { errorHandling } from './errorHandling.js'
import { userEndpoints } from './userEndpoints.js'

describe('Integration Testing', () => {
  configureSetupAndTeardown()
  errorHandling()
  userEndpoints()
})