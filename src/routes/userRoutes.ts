import { Router } from 'express'
import { userController } from '@/user/UserModule'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'

const userRoutes = Router()

const userSignup = userRoutes.post('/signup', userController.create.bind(userController))
const userUpdate = userRoutes.post(
  '/:id/update',
  AuthMiddleware.handler,
  userController.update.bind(userController)
)

export { userSignup, userUpdate }
