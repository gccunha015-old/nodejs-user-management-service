import { DEFAULT_HEADER } from "../utils/utils.js"
import { auth } from "./auth.js"
import { userRoutes } from "./userRoutes.js"

const routes = {
  ...userRoutes,
  ...auth,
  notFound: (request, response) => {
    response.writeHead(404, DEFAULT_HEADER)
    response.end()
  }
}

export { routes }