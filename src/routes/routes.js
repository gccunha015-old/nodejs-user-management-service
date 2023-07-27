import { DEFAULT_HEADER } from "../utils/utils.js"
import { auth } from "./auth.js"
import { users } from "./users.js"

const routes = {
  ...users,
  ...auth,
  notFound: (request, response) => {
    response.writeHead(404, DEFAULT_HEADER)
    response.end()
  }
}

export { routes }