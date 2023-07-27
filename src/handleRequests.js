import { parse } from 'node:url'
import { routes } from './routes/routes.js'
import { DEFAULT_HEADER } from './utils/utils.js'

function handleRequests(request, response) {
  const { url, method } = request
  const { pathname } = parse(url, true)
  const key = `${pathname}:${method.toLowerCase()}`
  const requestToProcess = routes[key] || routes.notFound
  return Promise.resolve(requestToProcess(request, response))
    .catch(handleError(response))
}

function handleError(response) {
  return error => {
    console.log(`${error.stack}`)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({
      error: `${error.message}`
    }))
    return response.end()
  }
}

export { handleRequests }