import { authController } from '@/auth/AuthModule'
import { Router } from 'express'

const authRoutes = Router()

authRoutes.post('/', authController.login.bind(authController))

export { authRoutes }
