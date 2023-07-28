import { once } from 'node:events'
import User from '../entities/user.js'
import { DEFAULT_HEADER, BASE_URL } from '../utils/utils.js'

const baseUrl = `${BASE_URL}/users`
const users = {
  '/users:get': async (request, response) => {
    response.end()
  },
  '/users:post': async (request, response) => {
    const data = await once(request, 'data')
    const user = new User(JSON.parse(data))
    response.writeHead(201, {...DEFAULT_HEADER, Location: `${baseUrl}/${user.id}`})
    response.write(JSON.stringify(user))
    response.end()
  }
}

export { users }