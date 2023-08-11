import { Router } from 'express'
import { UserRouter } from './users/UserRouter'

const router = Router()

router.use('/users', new UserRouter().router)

export { router }
