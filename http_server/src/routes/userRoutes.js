import { once } from 'node:events'
import { DEFAULT_HEADER, BASE_URL } from '../utils/utils.js'
import { userService } from '../services/userService.js'

const baseUrl = `${BASE_URL}/users`
const userRoutes = {
  '/users:get': async (request, response) => {
    const result = await userService.findAll()
    response.writeHead(200, {...DEFAULT_HEADER})
    response.write(JSON.stringify(result))
    response.end()
  },
  '/users:post': async (request, response) => {
    const data = await once(request, 'data')
    const user = await userService.create(JSON.parse(data))
    response.writeHead(201, {...DEFAULT_HEADER, Location: `${baseUrl}/${user.external_id}`})
    response.write(JSON.stringify(user))
    response.end()
  }
}

export { userRoutes }