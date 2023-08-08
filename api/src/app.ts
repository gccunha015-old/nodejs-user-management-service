import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'express-async-errors'
import '@config/prototype'
import { env } from '@config/env'
import { userRouter } from '@users/router'
// import { prisma } from './config/database'

const app: Express = express()

app.use(morgan('tiny'))

app.use(cors())

app.use(helmet())

app.use(express.json())

app.use('/users', userRouter)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message)
})

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `[app]: Server is running at ${env.PROTOCOL}://${env.HOST}:${env.PORT}`
  )
})
