import { Router } from 'express'
import { UserController } from './SessionController'

class UserRouter {
  constructor(
    private readonly _controller = new UserController(),
    public readonly router = Router()
  ) {
    router.get(
      '/:id',
      async (req, res) => await this._controller.findById(req, res)
    )
    router.get(
      '/',
      async (req, res) => await this._controller.findAll(req, res)
    )

    router.post(
      '/',
      async (req, res) => await this._controller.create(req, res)
    )
  }
}

export { UserRouter }
