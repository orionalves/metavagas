import { Router } from 'express'
import { userController } from '@/user/UserModule'

const userRoutes = Router()

const userSignup = userRoutes.post('/signup', userController.create.bind(userController))
const userUpdate = userRoutes.post('/:id/update', userController.update.bind(userController))

export { userSignup, userUpdate }
