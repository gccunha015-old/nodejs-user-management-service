import { Router } from 'express'
import { userController } from './controller'
import { userRepository } from './repository'

const userRouter = Router()

userRouter.get('/', userRepository.findAll)

userRouter.post('/', userController.create)

export { userRouter }
