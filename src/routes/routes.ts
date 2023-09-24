import { Router } from 'express'
import { userRoutes } from '@/routes/userRoutes'

const routes = Router()

routes.use('/signup', userRoutes)

export { routes }
