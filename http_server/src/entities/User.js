import { randomUUID } from 'node:crypto'

class User {
  constructor({email, password, options}) {
    this.external_id = randomUUID()
    this.email = email
    this.password = password
    this.created_at = new Date()
    this.options = options
  }
}

export { User }