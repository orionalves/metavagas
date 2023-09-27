import { Router } from 'express'
import { userRoutes } from '@/routes/userRoutes'
import { authRoutes } from '@/routes/authRoutes'
import { AuthMiddleware } from '@/middlewares/AuthMiddleware'
import { jobRoutes } from '@/routes/jobRoutes'

const routes = Router()

routes.use('/signup', userRoutes)
routes.use('/login', authRoutes)

routes.use(AuthMiddleware.handler)
routes.use('/jobs/create', jobRoutes)

export { routes }