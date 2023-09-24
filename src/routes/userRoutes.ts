import { Router } from 'express'
import { userController } from '@/user/UserModule'

const userRoutes = Router()

userRoutes.post('/', userController.create.bind(userController))

export { userRoutes }
