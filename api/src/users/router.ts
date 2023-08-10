import { Router } from 'express'
import { userController } from './controller'

const userRouter = Router()

userRouter.get('/', async (req, res) => await userController.findAll(req, res))

userRouter.post('/', async (req, res) => await userController.create(req, res))

export { userRouter }
