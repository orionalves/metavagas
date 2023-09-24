import { Router } from 'express'
import { userRoutes } from '@/routes/userRoutes'
import { authRoutes } from '@/routes/authRoutes'

const routes = Router()

routes.use('/signup', userRoutes)
routes.use('/login', authRoutes)

export { routes }
