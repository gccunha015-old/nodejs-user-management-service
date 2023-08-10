import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'express-async-errors'
import './config/prototype'
import { env } from './config/env'
import { database } from './config/database'
import { userRouter } from './users/router'
import { errorHandler } from './error/errorHandler'

database.$connect()
const app: Express = express()
app.use(morgan('tiny'))
app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/users', userRouter)
app.use(errorHandler)

const server = app.listen(env.PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(
    `[app] Server is running at ${env.PROTOCOL}://${env.HOST}:${env.PORT}`
  )
})

function gracefulShutdown() {
  /* eslint-disable no-console */
  return () => {
    console.log('[app] Graceful Shutdown')
    server.close(async () => {
      console.log('[app]    Closed http server')
      await database.$disconnect()
      console.log('[app]    Disconnected database')
      process.exit(0)
    })
  }
  /* eslint-enable no-console */
}

process.once('SIGINT', gracefulShutdown())
process.once('SIGTERM', gracefulShutdown())
process.on('uncaughtException', (error, origin) => {
  /* eslint-disable no-console */
  console.log(`uncaughtException: ${error}`)
  console.log(`origin: ${origin}`)
  /* eslint-enable no-console */
})
process.on('unhandledRejection', (reason) => {
  /* eslint-disable-next-line no-console */
  console.log(`unhandledRejection: ${reason}`)
})
